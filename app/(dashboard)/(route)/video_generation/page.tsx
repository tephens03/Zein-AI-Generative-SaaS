'use client';

import Heading from "@/components/heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Video } from 'lucide-react';
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Empty from "@/components/empty";
import * as z from "zod";
import { UserAvatar } from "@/components/user-avatar";
import { useProModal } from "@/hooks/use-pro-modal";


const VideoGenerationPage = () => {
  const router = useRouter()

  const proModal = useProModal();

  const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is required."),
  });

  const [videos, setVideos] = useState<string[]>([])


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })


  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      const response = await axios.post('/api/video_generator',
        {
          prompt: values.prompt
        });

      setVideos(current => [...current, "user: " + values.prompt, response.data[0]]);


      form.reset()
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }


    } finally {

      router.refresh();

    }

  };


  return (
    <div className="pb-12">
      <Heading icon={Video} backgroundColor="bg-green-500/50" color="text-green-500" description="Turn your words into Video" title="Video Generation" />
      <div className="px-4 lg:px-8">
        <div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="pl-4 border-0 outline-none 
                        focus-visible:ring-0 
                        focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="A clown fish swimming around..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />



              <Button className="col-span-12 lg:col-span-2 w-full bg-indigo-950	" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>
            </form>
          </Form>

        </div>

        <div className="space-y-4 mt-4">
          {videos.length == 0 && (<Empty />)}

          <div className="flex flex-col-reverse gap-y-4">
            {videos.map(video => {

              if (video.includes("user:")) {
                return (
                  <div key={video} className={'text-white p-4 rounded-lg w-full gap-x-8 flex items-center bg-white   bg-opacity-20'}>
                    {video.slice(6)}
                    < UserAvatar />
                  </div >
                )
              }
              else {
                return (
                  <video key={video} controls className="w-full mt-8">
                    <source src={video}></source>
                  </video>
                )
              }

            })}
          </div >

        </div>
      </div>
    </div >

  );
}

export default VideoGenerationPage


