// USDC Token Contract Integration (Celo)

import { Address, parseUnits, formatUnits } from "viem"

// Standard ERC20 ABI (minimal)
export const ERC20_ABI = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "recipient", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const

// USDC contract addresses on Celo
export const USDC_ADDRESSES = {
  celo: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C" as Address, // USDC on Celo mainnet
  alfajores: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B" as Address, // USDC on Alfajores testnet
} as const

export class USDCContract {
  /**
   * Get USDC balance for an address
   */
  static async getBalance(address: Address, publicClient: any): Promise<number> {
    const balance = await publicClient.readContract({
      address: USDC_ADDRESSES.alfajores, // TODO: Use correct network
      abi: ERC20_ABI,
      functionName: "balanceOf",
      args: [address],
    })

    return parseFloat(formatUnits(balance as bigint, 6)) // USDC has 6 decimals
  }

  /**
   * Approve USDC spending
   */
  static async approve(
    spenderAddress: Address,
    amount: number,
    walletClient: any
  ): Promise<{ txHash: string }> {
    const amountWei = parseUnits(amount.toString(), 6)

    const hash = await walletClient.writeContract({
      address: USDC_ADDRESSES.alfajores,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [spenderAddress, amountWei],
    })

    return { txHash: hash }
  }

  /**
   * Transfer USDC to recipient
   */
  static async transfer(
    recipientAddress: Address,
    amount: number,
    walletClient: any
  ): Promise<{ txHash: string }> {
    const amountWei = parseUnits(amount.toString(), 6)

    const hash = await walletClient.writeContract({
      address: USDC_ADDRESSES.alfajores,
      abi: ERC20_ABI,
      functionName: "transfer",
      args: [recipientAddress, amountWei],
    })

    return { txHash: hash }
  }

  /**
   * Check allowance for spender
   */
  static async getAllowance(
    ownerAddress: Address,
    spenderAddress: Address,
    publicClient: any
  ): Promise<number> {
    const allowance = await publicClient.readContract({
      address: USDC_ADDRESSES.alfajores,
      abi: ERC20_ABI,
      functionName: "allowance",
      args: [ownerAddress, spenderAddress],
    })

    return parseFloat(formatUnits(allowance as bigint, 6))
  }
}
