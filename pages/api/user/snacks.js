import { requireSession } from "@clerk/nextjs/api";
import { getSnacksForUser } from "../../../lib/user";

async function handler(req, res) {
  if (req.method === "GET") {
    const userId = req.session.userId;
    const result = await getSnacksForUser(userId);
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default requireSession(handler);
