// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { SelfVerificationRoot } from "@selfxyz/contracts/contracts/abstract/SelfVerificationRoot.sol";
import { ISelfVerificationRoot } from "@selfxyz/contracts/contracts/interfaces/ISelfVerificationRoot.sol";
import { SelfStructs } from "@selfxyz/contracts/contracts/libraries/SelfStructs.sol";
import { SelfUtils } from "@selfxyz/contracts/contracts/libraries/SelfUtils.sol";
import { IIdentityVerificationHubV2 } from "@selfxyz/contracts/contracts/interfaces/IIdentityVerificationHubV2.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ZkFluenceVerification
 * @notice Self Protocol verification contract for zkFluence influencer marketing platform
 * @dev Stores verification status for creators and brands with disclosed information
 */
contract ZkFluenceVerification is SelfVerificationRoot, Ownable {
    // Verification data structure
    struct VerificationData {
        bool verified;
        uint256 timestamp;
        string dateOfBirth; // Stored as YYMMDD string
        string name;
        string nationality;
        bytes32 userIdentifier;
        UserType userType; // Creator or Brand
    }

    // User type enum
    enum UserType {
        Unknown,
        Creator,
        Brand
    }

    // Storage
    mapping(address => VerificationData) public verifications;
    mapping(bytes32 => address) public identifierToAddress;

    SelfStructs.VerificationConfigV2 public verificationConfig;
    bytes32 public verificationConfigId;
    uint256 public totalVerifications;
    uint256 public totalCreators;
    uint256 public totalBrands;

    // Events
    event VerificationCompleted(
        address indexed userAddress,
        bytes32 indexed userIdentifier,
        uint256 timestamp,
        string dateOfBirth,
        UserType userType
    );

    event VerificationRevoked(
        address indexed userAddress,
        uint256 timestamp
    );

    event UserTypeUpdated(
        address indexed userAddress,
        UserType userType
    );

    /**
     * @notice Constructor
     * @param identityVerificationHubV2Address Address of Self Protocol verification hub
     * @param scope Scope identifier (must match frontend configuration)
     * @param _verificationConfig Verification requirements configuration
     */
    constructor(
        address identityVerificationHubV2Address,
        string memory scope,
        SelfUtils.UnformattedVerificationConfigV2 memory _verificationConfig
    ) SelfVerificationRoot(identityVerificationHubV2Address, scope) Ownable(msg.sender) {
        verificationConfig = SelfUtils.formatVerificationConfigV2(_verificationConfig);
        verificationConfigId = IIdentityVerificationHubV2(identityVerificationHubV2Address)
            .setVerificationConfigV2(verificationConfig);
    }

    /**
     * @notice Custom verification hook called after successful verification
     * @param output Verification output containing disclosed information
     * @param userData Additional user data (unused in this implementation)
     */
    function customVerificationHook(
        ISelfVerificationRoot.GenericDiscloseOutputV2 memory output,
        bytes memory userData
    ) internal override {
        address userAddress = address(uint160(output.userIdentifier));

        // Extract disclosed information
        string memory dateOfBirth = output.dateOfBirth;
        string memory name = output.name.length > 0 ? output.name[0] : "";
        string memory nationality = output.nationality;

        // Store verification data
        verifications[userAddress] = VerificationData({
            verified: true,
            timestamp: block.timestamp,
            dateOfBirth: dateOfBirth,
            name: name,
            nationality: nationality,
            userIdentifier: bytes32(output.userIdentifier),
            userType: UserType.Unknown
        });

        // Map identifier to address
        identifierToAddress[bytes32(output.userIdentifier)] = userAddress;

        // Increment counter
        totalVerifications++;

        emit VerificationCompleted(
            userAddress,
            bytes32(output.userIdentifier),
            block.timestamp,
            dateOfBirth,
            UserType.Unknown
        );
    }

    /**
     * @notice Get verification configuration ID for a user
     * @return The verification configuration ID
     */
    function getConfigId(
        bytes32, /* destinationChainId */
        bytes32, /* userIdentifier */
        bytes memory /* userDefinedData */
    ) public view override returns (bytes32) {
        return verificationConfigId;
    }

    /**
     * @notice Check if an address is verified
     * @param userAddress Address to check
     * @return verified True if verified
     */
    function isVerified(address userAddress) external view returns (bool verified) {
        return verifications[userAddress].verified;
    }

    /**
     * @notice Get verification data for an address
     * @param userAddress Address to query
     * @return Verification data struct
     */
    function getVerificationData(address userAddress)
        external
        view
        returns (VerificationData memory)
    {
        return verifications[userAddress];
    }

    /**
     * @notice Get age from date of birth
     * @param userAddress Address to query
     * @return age Age in years (approximate)
     */
    function getAge(address userAddress) external view returns (uint256 age) {
        VerificationData memory data = verifications[userAddress];
        if (!data.verified || bytes(data.dateOfBirth).length == 0) return 0;

        // Parse YYMMDD string format (e.g., "990815" for August 15, 1999)
        // Note: This assumes 2-digit year format where YY < 50 means 20YY, else 19YY
        bytes memory dobBytes = bytes(data.dateOfBirth);
        if (dobBytes.length < 6) return 0;

        // Extract year (first 2 digits)
        uint256 yy = (uint256(uint8(dobBytes[0])) - 48) * 10 + (uint256(uint8(dobBytes[1])) - 48);
        uint256 birthYear = yy < 50 ? 2000 + yy : 1900 + yy;

        uint256 currentYear = (block.timestamp / 365 days) + 1970;

        return currentYear >= birthYear ? currentYear - birthYear : 0;
    }

    /**
     * @notice Set user type (Creator or Brand)
     * @param userAddress Address to update
     * @param userType New user type
     */
    function setUserType(address userAddress, UserType userType) external {
        require(
            msg.sender == userAddress || msg.sender == owner(),
            "Not authorized"
        );
        require(verifications[userAddress].verified, "Not verified");
        require(userType != UserType.Unknown, "Invalid user type");

        // Update counters if changing type
        UserType oldType = verifications[userAddress].userType;
        if (oldType == UserType.Creator && userType != UserType.Creator) {
            totalCreators--;
        } else if (oldType == UserType.Brand && userType != UserType.Brand) {
            totalBrands--;
        }

        if (userType == UserType.Creator && oldType != UserType.Creator) {
            totalCreators++;
        } else if (userType == UserType.Brand && oldType != UserType.Brand) {
            totalBrands++;
        }

        verifications[userAddress].userType = userType;

        emit UserTypeUpdated(userAddress, userType);
    }

    /**
     * @notice Check if address is verified creator
     * @param userAddress Address to check
     * @return True if verified as creator
     */
    function isVerifiedCreator(address userAddress) external view returns (bool) {
        return verifications[userAddress].verified &&
               verifications[userAddress].userType == UserType.Creator;
    }

    /**
     * @notice Check if address is verified brand
     * @param userAddress Address to check
     * @return True if verified as brand
     */
    function isVerifiedBrand(address userAddress) external view returns (bool) {
        return verifications[userAddress].verified &&
               verifications[userAddress].userType == UserType.Brand;
    }

    /**
     * @notice Revoke verification (only contract owner or user themselves)
     * @param userAddress Address to revoke
     */
    function revokeVerification(address userAddress) external {
        require(
            msg.sender == userAddress || msg.sender == owner(),
            "Not authorized"
        );
        require(verifications[userAddress].verified, "Not verified");

        // Update counters
        if (verifications[userAddress].userType == UserType.Creator) {
            totalCreators--;
        } else if (verifications[userAddress].userType == UserType.Brand) {
            totalBrands--;
        }

        delete identifierToAddress[verifications[userAddress].userIdentifier];
        delete verifications[userAddress];

        emit VerificationRevoked(userAddress, block.timestamp);
    }

    /**
     * @notice Update verification config ID
     * @param configId New config ID
     */
    function setConfigId(bytes32 configId) external onlyOwner {
        verificationConfigId = configId;
    }

    /**
     * @notice Get platform statistics
     * @return total Total verifications
     * @return creators Total creators
     * @return brands Total brands
     */
    function getStats() external view returns (
        uint256 total,
        uint256 creators,
        uint256 brands
    ) {
        return (totalVerifications, totalCreators, totalBrands);
    }
}
