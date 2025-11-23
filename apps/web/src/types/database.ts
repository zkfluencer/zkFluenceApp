export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      creators: {
        Row: {
          id: string
          farcaster_fid: string
          farcaster_username: string | null
          farcaster_display_name: string | null
          farcaster_pfp_url: string | null
          tiktok_username: string | null
          tiktok_followers: number | null
          tiktok_engagement_rate: number | null
          self_id: string | null
          zk_proof_hash: string | null
          verification_status: 'pending' | 'verified' | 'rejected'
          wallet_address: string | null
          total_earnings: number
          campaigns_completed: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          farcaster_fid: string
          farcaster_username?: string | null
          farcaster_display_name?: string | null
          farcaster_pfp_url?: string | null
          tiktok_username?: string | null
          tiktok_followers?: number | null
          tiktok_engagement_rate?: number | null
          self_id?: string | null
          zk_proof_hash?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          wallet_address?: string | null
          total_earnings?: number
          campaigns_completed?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          farcaster_fid?: string
          farcaster_username?: string | null
          farcaster_display_name?: string | null
          farcaster_pfp_url?: string | null
          tiktok_username?: string | null
          tiktok_followers?: number | null
          tiktok_engagement_rate?: number | null
          self_id?: string | null
          zk_proof_hash?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          wallet_address?: string | null
          total_earnings?: number
          campaigns_completed?: number
          created_at?: string
          updated_at?: string
        }
      }
      brands: {
        Row: {
          id: string
          wallet_address: string
          name: string
          description: string | null
          logo_url: string | null
          website_url: string | null
          total_budget_locked: number
          campaigns_created: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          wallet_address: string
          name: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          total_budget_locked?: number
          campaigns_created?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          wallet_address?: string
          name?: string
          description?: string | null
          logo_url?: string | null
          website_url?: string | null
          total_budget_locked?: number
          campaigns_created?: number
          created_at?: string
          updated_at?: string
        }
      }
      campaigns: {
        Row: {
          id: string
          brand_id: string
          contract_address: string
          title: string
          description: string
          requirements: string
          budget_usdc: number
          reward_per_creator: number
          max_participants: number
          current_participants: number
          start_date: string
          end_date: string
          status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
          min_followers: number | null
          min_engagement_rate: number | null
          content_type: string | null
          hashtags: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand_id: string
          contract_address: string
          title: string
          description: string
          requirements: string
          budget_usdc: number
          reward_per_creator: number
          max_participants: number
          current_participants?: number
          start_date: string
          end_date: string
          status?: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
          min_followers?: number | null
          min_engagement_rate?: number | null
          content_type?: string | null
          hashtags?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand_id?: string
          contract_address?: string
          title?: string
          description?: string
          requirements?: string
          budget_usdc?: number
          reward_per_creator?: number
          max_participants?: number
          current_participants?: number
          start_date?: string
          end_date?: string
          status?: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled'
          min_followers?: number | null
          min_engagement_rate?: number | null
          content_type?: string | null
          hashtags?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      campaign_participants: {
        Row: {
          id: string
          campaign_id: string
          creator_id: string
          joined_at: string
          status: 'joined' | 'submitted' | 'approved' | 'rejected' | 'paid'
        }
        Insert: {
          id?: string
          campaign_id: string
          creator_id: string
          joined_at?: string
          status?: 'joined' | 'submitted' | 'approved' | 'rejected' | 'paid'
        }
        Update: {
          id?: string
          campaign_id?: string
          creator_id?: string
          joined_at?: string
          status?: 'joined' | 'submitted' | 'approved' | 'rejected' | 'paid'
        }
      }
      content_submissions: {
        Row: {
          id: string
          campaign_id: string
          creator_id: string
          participant_id: string
          tiktok_url: string
          content_hash: string | null
          metrics: Json
          status: 'pending' | 'approved' | 'rejected'
          rejection_reason: string | null
          reward_amount: number | null
          tx_hash: string | null
          submitted_at: string
          reviewed_at: string | null
          paid_at: string | null
        }
        Insert: {
          id?: string
          campaign_id: string
          creator_id: string
          participant_id: string
          tiktok_url: string
          content_hash?: string | null
          metrics?: Json
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          reward_amount?: number | null
          tx_hash?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          paid_at?: string | null
        }
        Update: {
          id?: string
          campaign_id?: string
          creator_id?: string
          participant_id?: string
          tiktok_url?: string
          content_hash?: string | null
          metrics?: Json
          status?: 'pending' | 'approved' | 'rejected'
          rejection_reason?: string | null
          reward_amount?: number | null
          tx_hash?: string | null
          submitted_at?: string
          reviewed_at?: string | null
          paid_at?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          tx_hash: string
          from_address: string
          to_address: string
          amount: number
          token: string
          type: 'campaign_deposit' | 'creator_reward' | 'campaign_refund'
          campaign_id: string | null
          creator_id: string | null
          status: 'pending' | 'confirmed' | 'failed'
          created_at: string
          confirmed_at: string | null
        }
        Insert: {
          id?: string
          tx_hash: string
          from_address: string
          to_address: string
          amount: number
          token?: string
          type: 'campaign_deposit' | 'creator_reward' | 'campaign_refund'
          campaign_id?: string | null
          creator_id?: string | null
          status?: 'pending' | 'confirmed' | 'failed'
          created_at?: string
          confirmed_at?: string | null
        }
        Update: {
          id?: string
          tx_hash?: string
          from_address?: string
          to_address?: string
          amount?: number
          token?: string
          type?: 'campaign_deposit' | 'creator_reward' | 'campaign_refund'
          campaign_id?: string | null
          creator_id?: string | null
          status?: 'pending' | 'confirmed' | 'failed'
          created_at?: string
          confirmed_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
