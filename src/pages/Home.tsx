import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const olderTask = tasks.find((task) => task.title === newTaskTitle);

    if (olderTask) {
      Alert.alert(
        "Task já cadastrada", 
        "Você não pode cadastrar uma task com o mesmo nome");
    } else {
      // Add new task
      const task: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }
      setTasks(oldState => [...oldState, task]);
    }  
  }

  function handleEditTask(taskId: number, newTaskTitle: string) {
    // Copy the content of the array to be able to change it
    const updatedTasks = tasks.map(task => ({ ...task }));

    // Look for taskId and set new title for it
    const task = updatedTasks.find((task) => task.id === taskId);
    if (task) {
      task.title = newTaskTitle;
      setTasks(updatedTasks); 
    }
  }

  function handleToggleTaskDone(id: number) {
    // Copy the content of the array to be able to change it
    const updatedTasks = tasks.map(task => ({ ...task }));

    // Toggle task done if exists
    const task = updatedTasks.find((task) => task.id === id);
    if (task) {
      task.done = !task.done;
      setTasks(updatedTasks); 
    }
  }

  function handleRemoveTask(id: number) {
    const alertButtons = [
      {
        text: "Não"
      },
      {
        text: "Sim",
        onPress: () => setTasks(tasks.filter((task) => task.id !== id))
      },
    ];

    Alert.alert(
      "Remover item", 
      "Tem certeza que você deseja remover esse item?", 
      alertButtons);

    // Remove task from state
    //setTasks(tasks.filter((task) => task.id !== id));  
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})