import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp
} from "firebase/firestore";

export type Plant = {
    id?: string;
    userId: string;
    name: string;
    kind: string;
    soilType: string;
    plantedDate: string;
    wateringSchedule: string;
    fertilizerSchedule: string;
    specialTreatment: string;
    imageUrl?: string;
    createdAt?: Date;
};

// Create a new plant
export const createPlant = async (plantData: Omit<Plant, "id" | "createdAt">) => {
    try {
        const docRef = await addDoc(collection(db, "plants"), {
            ...plantData,
            createdAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error("Error creating plant:", error);
        throw error;
    }
};

// Get all plants for a user
export const getUserPlants = async (userId: string): Promise<Plant[]> => {
    try {
        const q = query(
            collection(db, "plants"),
            where("userId", "==", userId),
            orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const plants: Plant[] = [];
        querySnapshot.forEach((doc) => {
            plants.push({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate(),
            } as Plant);
        });

        return plants;
    } catch (error) {
        console.error("Error fetching plants:", error);
        throw error;
    }
};

// Delete a plant
export const deletePlant = async (plantId: string) => {
    try {
        await deleteDoc(doc(db, "plants", plantId));
    } catch (error) {
        console.error("Error deleting plant:", error);
        throw error;
    }
};
