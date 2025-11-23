import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPolicy() {
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
          <h1>Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: {new Date().toLocaleDateString()}</p>

          <h2>1. Introduction</h2>
          <p>
            zkFluence ("we," "our," or "the Platform") is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your information when you use our decentralized
            influencer marketing platform.
          </p>

          <h2>2. Information We Collect</h2>

          <h3>2.1 Information You Provide</h3>
          <ul>
            <li><strong>Account Information:</strong> When you connect your accounts (Farcaster FID, TikTok username)</li>
            <li><strong>Campaign Data:</strong> Content submissions, pitches, and campaign participation information</li>
            <li><strong>Communication:</strong> Messages and interactions through the Platform</li>
          </ul>

          <h3>2.2 Information from Third-Party Services</h3>
          <ul>
            <li><strong>Farcaster:</strong> User profile, FID, wallet address, and public activity</li>
            <li><strong>TikTok:</strong> Username, display name, profile picture, follower count, video count,
            total likes, and engagement metrics via TikTok OAuth</li>
            <li><strong>Blockchain:</strong> Wallet addresses and transaction data from on-chain payments</li>
          </ul>

          <h3>2.3 Automatically Collected Information</h3>
          <ul>
            <li><strong>Usage Data:</strong> Pages visited, features used, campaign interactions</li>
            <li><strong>Device Information:</strong> Browser type, operating system, IP address</li>
            <li><strong>Performance Data:</strong> Error logs, load times, and technical diagnostics</li>
          </ul>

          <h2>3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Facilitate campaign matching between brands and creators</li>
            <li>Verify creator accounts and calculate engagement metrics</li>
            <li>Process payments and maintain transaction records</li>
            <li>Improve Platform functionality and user experience</li>
            <li>Communicate updates, opportunities, and Platform notifications</li>
            <li>Detect and prevent fraud or unauthorized activity</li>
            <li>Comply with legal obligations and enforce our Terms of Service</li>
          </ul>

          <h2>4. Information Sharing and Disclosure</h2>

          <h3>4.1 With Brands and Creators</h3>
          <p>
            We share creator profiles (including TikTok metrics) with brands for campaign matching. Campaign submissions
            are shared with the respective brand for review.
          </p>

          <h3>4.2 Public Blockchain Data</h3>
          <p>
            Payment transactions are recorded on public blockchains and are permanently visible. Wallet addresses
            associated with payments are publicly accessible.
          </p>

          <h3>4.3 Service Providers</h3>
          <p>We share data with trusted service providers who assist with:</p>
          <ul>
            <li>Database hosting (Supabase)</li>
            <li>Authentication services (TikTok OAuth)</li>
            <li>Analytics and performance monitoring</li>
            <li>Infrastructure and hosting services</li>
          </ul>

          <h3>4.4 Legal Requirements</h3>
          <p>We may disclose information when required by law, legal process, or to:</p>
          <ul>
            <li>Comply with legal obligations or government requests</li>
            <li>Protect rights, property, or safety of zkFluence, users, or the public</li>
            <li>Investigate fraud, security issues, or Terms violations</li>
          </ul>

          <h2>5. Data Storage and Security</h2>

          <h3>5.1 Storage</h3>
          <p>
            Your data is stored in secure databases (Supabase) with encryption at rest and in transit.
            Blockchain transactions are permanently stored on distributed networks.
          </p>

          <h3>5.2 Security Measures</h3>
          <p>We implement industry-standard security practices including:</p>
          <ul>
            <li>Encrypted data transmission (HTTPS/TLS)</li>
            <li>Secure authentication and authorization</li>
            <li>Regular security audits and monitoring</li>
            <li>Access controls and least-privilege principles</li>
          </ul>

          <h3>5.3 Data Retention</h3>
          <p>
            We retain your information for as long as your account is active or as needed to provide services.
            Campaign data and transaction records are retained indefinitely for legal and operational purposes.
          </p>

          <h2>6. Your Rights and Choices</h2>

          <h3>6.1 Access and Correction</h3>
          <p>
            You can access and update your profile information through the Platform. Contact us to request
            corrections to inaccurate data.
          </p>

          <h3>6.2 Account Deletion</h3>
          <p>
            You may request account deletion, which will remove your profile and personal data. Note that
            blockchain transactions cannot be deleted and campaign records may be retained for legal compliance.
          </p>

          <h3>6.3 Data Portability</h3>
          <p>
            You may request a copy of your data in a portable format. Contact us to initiate a data export request.
          </p>

          <h3>6.4 TikTok Data Revocation</h3>
          <p>
            You can disconnect your TikTok account at any time through TikTok's authorization settings.
            This will revoke our access to your TikTok data.
          </p>

          <h2>7. Third-Party Services</h2>

          <h3>7.1 TikTok</h3>
          <p>
            Our use of TikTok data is governed by TikTok's Terms of Service and Privacy Policy. We only access
            data necessary for Platform functionality (username, metrics) with your explicit authorization.
          </p>

          <h3>7.2 Farcaster</h3>
          <p>
            Farcaster is a decentralized social protocol. Your Farcaster data is public and distributed.
            We do not control Farcaster's data practices.
          </p>

          <h3>7.3 Blockchain Networks</h3>
          <p>
            Transaction data is publicly visible on blockchain networks. We cannot modify or delete on-chain data.
          </p>

          <h2>8. Cookies and Tracking</h2>
          <p>
            We use essential cookies for authentication and session management. We do not use third-party
            advertising or tracking cookies. You can disable cookies in your browser settings, though this may
            affect Platform functionality.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            The Platform is not intended for users under 18 years of age. We do not knowingly collect information
            from minors. If you believe we have collected data from a minor, please contact us immediately.
          </p>

          <h2>10. International Data Transfers</h2>
          <p>
            Your data may be transferred to and processed in countries different from your residence.
            We ensure appropriate safeguards are in place for international transfers.
          </p>

          <h2>11. Changes to Privacy Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Material changes will be communicated through the Platform.
            Continued use after changes constitutes acceptance of the updated policy.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            For privacy questions, data requests, or concerns, contact us at:
          </p>
          <ul>
            <li>Email: privacy@zkfluence.app</li>
            <li>Through the Platform contact form</li>
          </ul>

          <h2>13. Your Regional Rights</h2>

          <h3>13.1 GDPR (European Users)</h3>
          <p>If you are in the EU/EEA, you have rights under GDPR including:</p>
          <ul>
            <li>Right to access your personal data</li>
            <li>Right to rectification of inaccurate data</li>
            <li>Right to erasure ("right to be forgotten")</li>
            <li>Right to restrict processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
            <li>Right to withdraw consent</li>
          </ul>

          <h3>13.2 CCPA (California Users)</h3>
          <p>California residents have rights including:</p>
          <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to know if personal information is sold or disclosed</li>
            <li>Right to opt-out of sale of personal information</li>
            <li>Right to deletion of personal information</li>
            <li>Right to non-discrimination for exercising rights</li>
          </ul>

          <p className="mt-8 text-sm text-muted-foreground">
            We do not sell your personal information to third parties.
          </p>
        </div>
      </div>
    </div>
  )
}
