import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1>Terms of Service</h1>
          <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using zkFluence ("the Platform"), you accept and agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the Platform.
          </p>

          <h2>2. Platform Description</h2>
          <p>
            zkFluence is a decentralized influencer marketing platform that connects brands with TikTok creators for
            campaign collaborations. The Platform operates as a Farcaster Mini App and facilitates content creation,
            submission, and payment processing.
          </p>

          <h2>3. User Accounts</h2>
          <h3>3.1 Creators</h3>
          <p>
            Creators must connect both their Farcaster account and TikTok account to participate in campaigns.
            You are responsible for maintaining the security of your connected accounts.
          </p>

          <h3>3.2 Brands</h3>
          <p>
            Brands must provide accurate campaign information and ensure sufficient funds for campaign payments.
            Brands are responsible for reviewing and approving creator submissions.
          </p>

          <h2>4. Campaign Participation</h2>
          <h3>4.1 Creator Obligations</h3>
          <ul>
            <li>Submit original content that meets campaign requirements</li>
            <li>Comply with campaign guidelines and deadlines</li>
            <li>Maintain TikTok Community Guidelines compliance</li>
            <li>Provide accurate engagement metrics and account information</li>
            <li>Not use fraudulent methods to inflate metrics</li>
          </ul>

          <h3>4.2 Brand Obligations</h3>
          <ul>
            <li>Provide clear and complete campaign requirements</li>
            <li>Review submissions within specified timeframes</li>
            <li>Ensure payment upon approval of content</li>
            <li>Respect creator intellectual property rights</li>
          </ul>

          <h2>5. Content and Intellectual Property</h2>
          <h3>5.1 Creator Content</h3>
          <p>
            Creators retain ownership of their content but grant brands a license to use approved content as specified
            in campaign terms. Creators represent that their content is original and does not infringe third-party rights.
          </p>

          <h3>5.2 Platform Content</h3>
          <p>
            All Platform features, design, and functionality are owned by zkFluence and protected by intellectual property laws.
          </p>

          <h2>6. Payments and Transactions</h2>
          <h3>6.1 Payment Processing</h3>
          <p>
            Payments are processed on-chain upon content approval. Transaction fees apply and are the responsibility of
            the paying party. All payments are final and non-refundable once processed.
          </p>

          <h3>6.2 Disputes</h3>
          <p>
            Payment disputes must be raised within 7 days of transaction. The Platform may mediate disputes but does not
            guarantee resolution in favor of any party.
          </p>

          <h2>7. Prohibited Conduct</h2>
          <p>Users may not:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe intellectual property rights</li>
            <li>Submit false or misleading information</li>
            <li>Manipulate or artificially inflate engagement metrics</li>
            <li>Harass, abuse, or harm other users</li>
            <li>Attempt to circumvent Platform security or payments</li>
            <li>Use automated systems to access the Platform</li>
          </ul>

          <h2>8. Data and Privacy</h2>
          <p>
            Your use of the Platform is subject to our Privacy Policy. We collect and process data from your Farcaster
            and TikTok accounts as described in the Privacy Policy.
          </p>

          <h2>9. Third-Party Services</h2>
          <p>
            The Platform integrates with TikTok, Farcaster, and blockchain networks. We are not responsible for the
            availability, content, or practices of these third-party services.
          </p>

          <h2>10. Disclaimers</h2>
          <p>
            THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DO NOT GUARANTEE UNINTERRUPTED ACCESS,
            CAMPAIGN SUCCESS, OR SPECIFIC OUTCOMES. WE ARE NOT LIABLE FOR CREATOR-BRAND DISPUTES OR CONTENT PERFORMANCE.
          </p>

          <h2>11. Limitation of Liability</h2>
          <p>
            TO THE MAXIMUM EXTENT PERMITTED BY LAW, zkFluence SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
            CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.
          </p>

          <h2>12. Termination</h2>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms. You may stop using the
            Platform at any time. Provisions regarding intellectual property, disclaimers, and liability survive termination.
          </p>

          <h2>13. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. Continued use of the Platform after changes constitutes acceptance
            of the modified Terms.
          </p>

          <h2>14. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the jurisdiction where zkFluence operates, without regard to
            conflict of law provisions.
          </p>

          <h2>15. Contact Information</h2>
          <p>
            For questions about these Terms, please contact us through the Platform or at legal@zkfluence.app
          </p>
        </div>
      </div>
    </div>
  )
}
