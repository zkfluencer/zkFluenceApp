// Campaign Escrow Smart Contract Integration

import { Address, parseUnits, formatUnits } from "viem"

// Contract ABI - TODO: Replace with actual compiled ABI
export const CAMPAIGN_ESCROW_ABI = [
  {
    inputs: [
      { name: "campaignId", type: "bytes32" },
      { name: "totalAmount", type: "uint256" },
      { name: "rewardPerCreator", type: "uint256" },
      { name: "maxCreators", type: "uint256" },
    ],
    name: "createCampaign",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { name: "campaignId", type: "bytes32" },
      { name: "creator", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "releasePayment",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "campaignId", type: "bytes32" }],
    name: "getCampaignBalance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "campaignId", type: "bytes32" }],
    name: "cancelCampaign",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const

// Contract addresses - TODO: Replace with deployed addresses
export const CAMPAIGN_ESCROW_ADDRESSES = {
  celo: "0x0000000000000000000000000000000000000000" as Address,
  alfajores: "0x0000000000000000000000000000000000000000" as Address,
} as const

export interface CampaignEscrowConfig {
  campaignId: string
  totalAmount: number
  rewardPerCreator: number
  maxCreators: number
}

export class CampaignEscrowContract {
  /**
   * Create a new campaign escrow
   */
  static async createCampaign(
    config: CampaignEscrowConfig,
    walletClient: any
  ): Promise<{ txHash: string }> {
    const { campaignId, totalAmount, rewardPerCreator, maxCreators } = config

    // Convert campaign ID to bytes32
    const campaignIdBytes = `0x${campaignId.padStart(64, "0")}`

    // Convert amounts to wei (USDC has 6 decimals)
    const totalAmountWei = parseUnits(totalAmount.toString(), 6)
    const rewardPerCreatorWei = parseUnits(rewardPerCreator.toString(), 6)

    const hash = await walletClient.writeContract({
      address: CAMPAIGN_ESCROW_ADDRESSES.alfajores, // TODO: Use correct network
      abi: CAMPAIGN_ESCROW_ABI,
      functionName: "createCampaign",
      args: [campaignIdBytes, totalAmountWei, rewardPerCreatorWei, BigInt(maxCreators)],
    })

    return { txHash: hash }
  }

  /**
   * Release payment to creator
   */
  static async releasePayment(
    campaignId: string,
    creatorAddress: Address,
    amount: number,
    walletClient: any
  ): Promise<{ txHash: string }> {
    const campaignIdBytes = `0x${campaignId.padStart(64, "0")}`
    const amountWei = parseUnits(amount.toString(), 6)

    const hash = await walletClient.writeContract({
      address: CAMPAIGN_ESCROW_ADDRESSES.alfajores,
      abi: CAMPAIGN_ESCROW_ABI,
      functionName: "releasePayment",
      args: [campaignIdBytes, creatorAddress, amountWei],
    })

    return { txHash: hash }
  }

  /**
   * Get campaign escrow balance
   */
  static async getCampaignBalance(campaignId: string, publicClient: any): Promise<number> {
    const campaignIdBytes = `0x${campaignId.padStart(64, "0")}`

    const balance = await publicClient.readContract({
      address: CAMPAIGN_ESCROW_ADDRESSES.alfajores,
      abi: CAMPAIGN_ESCROW_ABI,
      functionName: "getCampaignBalance",
      args: [campaignIdBytes],
    })

    return parseFloat(formatUnits(balance as bigint, 6))
  }

  /**
   * Cancel campaign and refund
   */
  static async cancelCampaign(campaignId: string, walletClient: any): Promise<{ txHash: string }> {
    const campaignIdBytes = `0x${campaignId.padStart(64, "0")}`

    const hash = await walletClient.writeContract({
      address: CAMPAIGN_ESCROW_ADDRESSES.alfajores,
      abi: CAMPAIGN_ESCROW_ABI,
      functionName: "cancelCampaign",
      args: [campaignIdBytes],
    })

    return { txHash: hash }
  }
}
