import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import xIcon from '../assets/icons/x.png'
import pen_editIcon from '../assets/icons/pen_edit.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TaskProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id: number, title: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskProps) {
    const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
    const [taskNewTitle, setTaskNewTitle] = useState<string>(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setIsEditingTask(true);
    }

    function handleCancelEditing() {
        // Restores the original value
        setTaskNewTitle(task.title);
        setIsEditingTask(false);
    }
    
    function handleSubmitEditing() {
        editTask(task.id, taskNewTitle);
        setIsEditingTask(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditingTask) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
    }, [isEditingTask]);

    return (
        <>
            <View>
                <TouchableOpacity
                    testID={`button-${task.id}`}
                    activeOpacity={0.7}
                    style={styles.taskButton}
                    onPress={() => toggleTaskDone(task.id)}
                >
                    <View 
                        testID={`marker-${task.id}`}
                        style={task.done ? styles.taskMarkerDone : styles.taskMarker}  
                    >
                        { task.done && (
                        <Icon 
                            name="check"
                            size={12}
                            color="#FFF"
                        />
                        )}
                    </View>

                    <TextInput 
                        style={task.done ? styles.taskTextDone : styles.taskText}
                        value={taskNewTitle} 
                        editable={isEditingTask}
                        onChangeText={setTaskNewTitle}
                        onSubmitEditing={handleSubmitEditing}
                        ref={textInputRef}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.taskIcons}>                
                {
                    isEditingTask
                    ? <TouchableOpacity
                        testID={`editing-${task.id}`}
                        style={{ paddingHorizontal: 12 }}
                        onPress={handleCancelEditing}
                    >
                        <Image source={xIcon} />
                    </TouchableOpacity>

                    : <TouchableOpacity
                        testID={`pen-edit-${task.id}`}
                        style={{ paddingHorizontal: 12 }}
                        onPress={handleStartEditing}
                    >
                        <Image source={pen_editIcon} />
                    </TouchableOpacity>
                }

                <View 
                    style={{ width: 1, 
                             height: 24, 
                             backgroundColor: 'rgba(196, 196, 196, 0.24)'}}>

                </View>
                <TouchableOpacity
                    testID={`trash-${task.id}`}
                    style={{ paddingHorizontal: 12 }}
                    onPress={() => removeTask(task.id)}
                    disabled={isEditingTask}
                >
                    <Image 
                        source={trashIcon}
                        style={{ opacity: isEditingTask ? 0.2 : 1 }} 
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
  taskIcons: {
    flexDirection: 'row',
    alignItems: 'flex-end'
  },  
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})