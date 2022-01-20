import { requireSession } from "@clerk/nextjs/api";
import { getUser } from "../../lib/user";

async function handler(req, res) {
  if (req.method === "GET") {
    const userId = req.session.userId;
    const result = await getUser(userId);
    res.status(200).json(result);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default requireSession(handler);
