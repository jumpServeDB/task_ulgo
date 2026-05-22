import type { Request, Response } from "express";
import Task from "../models/taskModel.js";

// GET /api/tasks  -  All tasks
export const getTasks = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?._id;
    if (!ownerId) return res.status(401).json({ error: "Unauthorized" });

    const tasks = await Task.find({ owner: ownerId }).sort({ createdAt: -1 }).lean();
    return res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// GET /api/tasks/:id  -  Specific Task
export const getTask = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?._id;
    if (!ownerId) return res.status(401).json({ error: "Unauthorized" });

    const task = await Task.findOne({ _id: req.params.id, owner: ownerId }).lean();
    if (!task) return res.status(404).json({ error: "Not found" });
    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// POST /api/tasks  -  Create new Task
export const createTask = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?._id;
    if (!ownerId) return res.status(401).json({ error: "Unauthorized" });

    const { title } = req.body as { title?: string };
    if (!title) return res.status(400).json({ error: "Title required" });

    const created = await Task.create({ title, owner: ownerId, completed: false });
    return res.status(201).json(created);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// PATCH /api/tasks/:id  -  Update Task (toggle "completed")
export const updateTask = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?._id;
    if (!ownerId) return res.status(401).json({ error: "Unauthorized" });

    const updates = req.body as Partial<{ title: string; completed: boolean }>;
    if (Object.keys(updates).length === 0) return res.status(400).json({ error: "No updates provided" });

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, owner: ownerId },
      { $set: updates },
      { new: true }
    ).lean();

    if (!task) return res.status(404).json({ error: "Not found or not authorized" });
    return res.status(200).json(task);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// DELETE /api/tasks/:id  -  Detele a Task
export const deleteTask = async (req: Request, res: Response) => {
  try {
    const ownerId = req.user?._id;
    if (!ownerId) return res.status(401).json({ error: "Unauthorized" });

    const deleted = await Task.findOneAndDelete({ _id: req.params.id, owner: ownerId }).lean();
    if (!deleted) return res.status(404).json({ error: "Not found or not authorized" });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
