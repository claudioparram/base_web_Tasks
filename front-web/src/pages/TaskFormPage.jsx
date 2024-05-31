import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask,deleteTask, updateTask,getTask} from '../api/tasks.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function TaskFormPage(){

    const {
        register,
        handleSubmit,
        formState:{errors},
        setValue
        } = useForm();

    const navigate = useNavigate();
    const params = useParams();
    const onSubmit = handleSubmit(async (data)=>{
        if(params.id){
            // Editando
            await updateTask(params.id,data);
            toast.success(`Task ${params.id} updated`, {
                position:'bottom-right',
                style:{
                    background:"#101010",
                    color: "#FFFFFF"
                }
            }
            );
        } else {
            // creando
            const res = await createTask(data);
            console.log(res);
            toast.success(`Task ${res.data.id} created`, {
                position:'bottom-right',
                style:{
                    background:"#101010",
                    color: "#FFFFFF"
                }
            }
            );
        }
        navigate('/tasks')
    });

    useEffect(()=>{
        async function loadTask(){
            if(params.id){
                const {data} = await getTask(params.id);
                setValue('title',data.title);
                setValue('description',data.description)
            }   
        }
        loadTask();
    },[])
    return (
    <div className='max-w-xl mx-auto'>
        <form onSubmit={onSubmit}>
            <input 
                type="text" 
                placeholder="title" 
                {...register('title',{required:true})}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
            />
            {errors.title && <span>title is required</span>}
            <textarea 
                rows="3" 
                placeholder="description"
                {...register('description',{required:true})}
                className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
            />
            {errors.description && <span>description is required</span>}
            <button
            className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'
            >save</button>
        </form>
        {params.id && (
            <div className='flex justify-end'>
                <button 
                    className='bg-red-600 rounded-lg p-3 block w-48 mt-3'
                    onClick={async ()=>{
                    const accepted = window.confirm("are you sure?")
                    if(accepted){
                        await deleteTask(params.id);
                        toast.success(`Task ${params.id} deleted`, {
                            position:'bottom-right',
                            style:{
                                background:"#101010",
                                color: "#FFFFFF"
                            }
                        }
                        );
                    navigate("/tasks");
                }
                }}>Delete</button>
            </div>
        )}
    </div>
    );
}