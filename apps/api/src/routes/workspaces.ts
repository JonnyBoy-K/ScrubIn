import { Router } from "express";
import { listMembers, removeMember } from "../controllers/memberController";
import { requireAuth } from "@clerk/express";

const router = Router();

router.get("/workspaces/:id/members", requireAuth(), listMembers);
router.delete("/workspaces/:id/members/:userId", requireAuth(), removeMember);

export default router;
