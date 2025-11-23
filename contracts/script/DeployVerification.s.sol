// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import { ZkFluenceVerification } from "../src/ZkFluenceVerification.sol";
import { BaseScript } from "./Base.s.sol";
import { console } from "forge-std/console.sol";
import { SelfUtils } from "@selfxyz/contracts/contracts/libraries/SelfUtils.sol";

/// @title DeployVerification
/// @notice Deployment script for ZkFluenceVerification contract
contract DeployVerification is BaseScript {
    // Custom errors
    error DeploymentFailed();
    error InvalidHubAddress();

    /// @notice Main deployment function
    /// @return verification The deployed ZkFluenceVerification contract
    function run() public broadcast returns (ZkFluenceVerification verification) {
        // Get hub address from environment
        address hubAddress = getHubAddress();
        if (hubAddress == address(0)) revert InvalidHubAddress();

        // Get scope seed (must match frontend config)
        string memory scopeSeed = vm.envOr("SCOPE_SEED", string("zkfluence-platform"));

        // Get minimum age
        uint256 minimumAge = vm.envOr("MINIMUM_AGE", uint256(18));

        // Get OFAC setting
        bool ofacEnabled = vm.envOr("OFAC_ENABLED", false);

        // Parse excluded countries from comma-separated string
        string memory excludedCountriesStr = vm.envOr("EXCLUDED_COUNTRIES", string(""));
        string[] memory forbiddenCountries = parseCountries(excludedCountriesStr);

        // Create verification config
        SelfUtils.UnformattedVerificationConfigV2 memory verificationConfig = SelfUtils
            .UnformattedVerificationConfigV2({
            olderThan: minimumAge,
            forbiddenCountries: forbiddenCountries,
            ofacEnabled: ofacEnabled
        });

        console.log("=== zkFluence Verification Deployment ===");
        console.log("Network:", getNetworkName());
        console.log("Hub Address:", hubAddress);
        console.log("Scope Seed:", scopeSeed);
        console.log("Minimum Age:", minimumAge);
        console.log("OFAC Enabled:", ofacEnabled);
        console.log("Deployer:", broadcaster);

        // Deploy contract
        verification = new ZkFluenceVerification(hubAddress, scopeSeed, verificationConfig);

        // Verify deployment
        if (address(verification) == address(0)) revert DeploymentFailed();

        // Log deployment info
        console.log("\n=== Deployment Successful ===");
        console.log("Contract Address:", address(verification));
        console.log("Scope Value:", verification.scope());
        console.log("Config ID:", uint256(verification.verificationConfigId()));

        console.log("\n=== Next Steps ===");
        console.log("1. Update frontend .env with:");
        console.log("   NEXT_PUBLIC_SELF_ENDPOINT=%s", toHexString(address(verification)));
        console.log("   NEXT_PUBLIC_VERIFICATION_CONTRACT_ADDRESS=%s", toHexString(address(verification)));
        console.log("   NEXT_PUBLIC_SELF_SCOPE=%s", scopeSeed);
        console.log("   NEXT_PUBLIC_SELF_ENDPOINT_TYPE=%s", getNetworkName());
        console.log("2. Verify contract on CeloScan or Sourcify");
        console.log("3. Test verification flow");

        return verification;
    }

    /// @notice Get hub address based on network
    function getHubAddress() internal view returns (address) {
        string memory network = getNetworkName();

        if (keccak256(bytes(network)) == keccak256(bytes("base-sepolia"))) {
            return vm.envOr("BASE_SEPOLIA_HUB_ADDRESS", address(0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74));
        } else if (keccak256(bytes(network)) == keccak256(bytes("base"))) {
            return vm.envOr("BASE_HUB_ADDRESS", address(0)); // Update with mainnet hub when available
        } else if (keccak256(bytes(network)) == keccak256(bytes("celo-sepolia"))) {
            return vm.envOr("CELO_SEPOLIA_HUB_ADDRESS", address(0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74));
        } else if (keccak256(bytes(network)) == keccak256(bytes("celo"))) {
            return vm.envOr("CELO_HUB_ADDRESS", address(0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF));
        }

        return address(0);
    }

    /// @notice Get network name from environment
    function getNetworkName() internal view returns (string memory) {
        return vm.envOr("NETWORK", string("celo"));
    }

    /// @notice Parse comma-separated country codes
    function parseCountries(string memory countriesStr) internal pure returns (string[] memory) {
        if (bytes(countriesStr).length == 0) {
            return new string[](0);
        }

        // Simple parsing for comma-separated values
        // For production, consider more robust parsing
        string[] memory countries = new string[](1);
        countries[0] = countriesStr;
        return countries;
    }

    /// @notice Convert address to hex string
    function toHexString(address addr) internal pure returns (string memory) {
        bytes memory buffer = new bytes(42);
        buffer[0] = "0";
        buffer[1] = "x";

        for (uint256 i = 0; i < 20; i++) {
            bytes1 b = bytes1(uint8(uint256(uint160(addr)) / (2 ** (8 * (19 - i)))));
            bytes1 hi = bytes1(uint8(b) / 16);
            bytes1 lo = bytes1(uint8(b) - 16 * uint8(hi));
            buffer[2 * i + 2] = char(hi);
            buffer[2 * i + 3] = char(lo);
        }

        return string(buffer);
    }

    /// @notice Convert byte to char
    function char(bytes1 b) internal pure returns (bytes1 c) {
        if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
        else return bytes1(uint8(b) + 0x57);
    }
}
