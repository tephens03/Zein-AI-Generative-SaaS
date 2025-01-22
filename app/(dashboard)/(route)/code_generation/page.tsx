'use client';

import Heading from "@/components/heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Code } from 'lucide-react';
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionRequestMessage } from "openai";
import Empty from "@/components/empty";
import * as z from "zod";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import ReactMarkdown from 'react-markdown'
import { useProModal } from "@/hooks/use-pro-modal";

const CodeGeneratorPage = () => {
  const proModal = useProModal();
  const router = useRouter()

  //1. Define a schema using zod
  const formSchema = z.object({
    prompt: z.string().min(1, "Prompt is required."),
  });

  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([])

  //2. Create a form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {//
      prompt: "",//
    },// We actually dont need a default value
  })

  const isLoading = form.formState.isSubmitting;

  //3. Define a funciton that handles the event
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

      //4 check OpenAI 3.3
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt
        // content: "You are code generator now, so please behave like ons " + values.prompt
      }
      const newMessages = [...messages, userMessage]

      //axios is a special method that allows us to send a POST request to a certain endpoint. And what ever in that endpoint (file) that has the same method name as
      // POST will be called
      const response = await axios.post('/api/code_generator', { messages: newMessages, and: "deeznuts" });


      setMessages((current) => [...current, userMessage, response.data]);



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
      <Heading icon={Code} backgroundColor="bg-red-700/50" color="text-red-700" description="Write code with the most advanced model" title="Code Generator" />
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
                        placeholder="How to create a pointer using malloc in C?"
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
          {messages.length === 0 && !isLoading && (<Empty />)}

          {/* {isLoading && (<Loading />)} */}

          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((message) => {
              return (

                <div key={message.content} className={`text-white p-4 rounded-lg w-full gap-x-8 flex items-center bg-white ${message.role !== 'user' ? ' bg-opacity-20' : 'bg-opacity-10'}`}>
                  {message.role === 'user' && <UserAvatar />}
                  {/* <ReactMarkdown>
                    {message.content || ''}
                  </ReactMarkdown> */}

                  <ReactMarkdown components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    )
                  }} className="text-sm overflow-hidden leading-7">
                    {message.content || ""}
                  </ReactMarkdown>

                  {message.role !== 'user' && <BotAvatar />}
                </div >

              );
            })}
          </div >
        </div>
      </div>
    </div >

  );
}

export default CodeGeneratorPage


