import { Exercise, exercisesData, ExerciseWithDetails } from "@/data/ExercisesData";

export const addExercise: (exercises: ExerciseWithDetails[], newExercise: ExerciseWithDetails) => ExerciseWithDetails[] = (
    exercises: ExerciseWithDetails[],
    newExercise: ExerciseWithDetails
  ) => {
    const existingExercise = exercises.find(
      (exercise: ExerciseWithDetails) =>
        exercise.id === newExercise.id &&
        exercise.category === newExercise.category
    );
  
    if (!existingExercise) {
      return [...exercises, newExercise];
    } else {
      return exercises.map(exercise =>
        exercise.id === newExercise.id && exercise.category === newExercise.category
          ? { ...exercise, series: newExercise.series, repetitions: newExercise.repetitions }
          : exercise
      );
    }
  };
  
  export const getExercisesByCategory: (category: string) => Exercise[] = (category: string) => {
    const filteredExercises: Exercise[] = exercisesData.filter(
      (exercise: Exercise) => exercise.category === category
    );
    return filteredExercises;
  };