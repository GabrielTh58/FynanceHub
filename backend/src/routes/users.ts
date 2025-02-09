import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();
const userController = new UserController()

router.get("/:id", async (req, res) => {
    try{
        await userController.findById(req, res);
    } catch (error) {
        console.error("Error getting user route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/email", async (req, res) => {
    try{
        await userController.findByEmail(req, res);
    } catch (error) {
        console.error("Error getting user route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try{
        await userController.updateUser(req, res);
    }catch(e){
        console.error("Error updating user route:", e);
        res.status(500).json({ error: "Internal Server Error" });      
    }
})

router.delete("/:id", async (req, res) => {
    try{
        await userController.deleteUser(req, res);
    }catch (error) {
        console.error("Error deleting user route:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

export default router;