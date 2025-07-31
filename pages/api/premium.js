import { getSession } from "next-auth/react";
import dbConnect from "../../lib/db";
import PremiumUser from "../../models/PremiumUser";

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session?.user?.isAdmin) return res.status(403).json({ error: "Forbidden" });

  await dbConnect();
  const { email, plan } = req.body;

  let expiresAt = null;
  const now = new Date();

  switch (plan) {
    case "10min":
      expiresAt = new Date(now.getTime() + 10 * 60000);
      break;
    case "1month":
      expiresAt = new Date(now.setMonth(now.getMonth() + 1));
      break;
    case "3month":
      expiresAt = new Date(now.setMonth(now.getMonth() + 3));
      break;
    case "6month":
      expiresAt = new Date(now.setMonth(now.getMonth() + 6));
      break;
    case "1year":
      expiresAt = new Date(now.setFullYear(now.getFullYear() + 1));
      break;
    case "permanent":
      expiresAt = null;
      break;
  }

  await PremiumUser.findOneAndUpdate(
    { email },
    { email, plan, expiresAt },
    { upsert: true }
  );

  res.status(200).json({ success: true });
}
