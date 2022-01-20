import { requireSession } from "@clerk/nextjs/api";
import { addSnacks, removeSnacks } from "../../../../lib/user";

async function handler(req, res) {
  const userId = req.session.userId;
  const {
    method,
    query: { id },
  } = req;

  switch (method) {
    case "PUT":
      await addSnacks(userId, [id]);
      res.status(200).end();
      break;
    case "DELETE":
      await removeSnacks(userId, [id]);
      res.status(200).end();
      break;
    default:
      res.setHeader("Allow", ["PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

export default requireSession(handler);
