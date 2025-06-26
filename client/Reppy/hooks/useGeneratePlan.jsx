import { useState, useEffect } from "react";
import { createWorkout } from "../utils/api";

export default function useGeneratePlan(days, equipment) {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!days || !equipment) return;

    const fetchWorkout = async () => {
      try {
        setLoading(true);
        const result = await createWorkout(days, equipment);
        setPlan(result);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch workout");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkout();
  }, [days, equipment]);

  return { plan, loading, error };
}
