import { FileInput, Select, TextInput, Button } from 'flowbite-react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='bg-white dark:bg-[rgb(16,23,42)] min-h-screen px-4 md:px-10 w-full'>
        <div className="max-w-4xl py-20 mx-auto">
            <h1 className='text-center font-semibold text-3xl my-16 md:mt-20'>Create Your Post</h1>

            <form className='flex flex-col gap-4'>
                <div className='flex flex-col gap-4 sm:flex-row justify-between'>
                    <TextInput type='text' placeholder='Title' required id='title' className='flex-1' />

                    <Select>
                        <option value='uncategorized'>Select a Category</option>
                        <option value='javascript'>JavaScript</option>
                        <option value='reactjs'>React.js</option>
                        <option value='nextjs'>Next.js</option>
                        <option value='typescript'>TypeScript</option>
                        <option value='vuejs'>Vue.js</option>
                       
                    </Select>
                </div>

                <div className='flex gap-4 items-center justify-between border-4 border-teal-600 border-dotted p-4'>
                   <FileInput type='file' accept='image/*' /> 
                   <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
                </div>
                
                {/* The Editor */}
                <ReactQuill theme='snow' placeholder='Write something amazing...' className='h-72 mb-12' required />    
                <Button type='submit' gradientDuoTone='purpleToPink'>PUBLISH POST</Button>
            </form>
         
        </div>
    </div>
  )
}

export default CreatePost