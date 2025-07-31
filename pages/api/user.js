import { getSession } from "next-auth/react";
import dbConnect from "../../lib/db";
import PremiumUser from "../../models/PremiumUser";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ error: "Unauthorized" });

  await dbConnect();
  const premium = await PremiumUser.findOne({ email: session.user.email });

  let isPremium = false;
  if (premium) {
    if (premium.plan === "permanent" || (premium.expiresAt && new Date(premium.expiresAt) > new Date())) {
      isPremium = true;
    }
  }

  res.status(200).json({
    user: session.user,
    premium: isPremium,
    plan: premium?.plan || null,
  });
}
