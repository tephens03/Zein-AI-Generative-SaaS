'use client';
import Image from 'next/image'

import Heading from "@/components/heading";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Download, Image as ImageIcon } from 'lucide-react';
import axios from "axios";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as z from "zod";
import { formSchema, resolutions, quantities } from "./constants";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Card, CardFooter } from "@/components/ui/card";


import { useProModal } from "@/hooks/use-pro-modal";


const ImageGenerationPage = () => {
  const proModal = useProModal();


  const router = useRouter()

  const [photos, setPhotos] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      quantity: quantities[0].value,
      resolution: resolutions[0].value,
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {

    const userMessage = {
      prompt: values.prompt,
      quantity: values.quantity,
      resolution: values.resolution,
    }

    try {

      const response = await axios.post('/api/image_generator', { userMessage, and: "deeznuts" });

      const urls = response.data.map((image: { url: string }) => image.url);

      setPhotos(urls);

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
      <Heading icon={ImageIcon} backgroundColor="bg-pink-500/50" color="text-pink-500" description="Turn your idea into images" title="Image Generation" />
      <div className="px-4 lg:px-8">
        <div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >

              {/* Input the prompt here */}
              <FormField name="prompt" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input className="pl-4 border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent" disabled={isLoading} placeholder="Create an image of a man with ..." {...field} />
                  </FormControl>
                </FormItem>
              )}
              />

              {/* Input the quantity here */}
              <FormField control={form.control} name="quantity" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {quantities.map((quantity) => (
                        <SelectItem key={quantity.value} value={quantity.value}>
                          {quantity.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
              />

              {/* Input the resolution here */}
              <FormField control={form.control} name="resolution" render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-6">
                  <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {resolutions.map((resolution) => (
                        <SelectItem key={resolution.value} value={resolution.value}>
                          {resolution.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
              />


              <Button className="col-span-12 lg:col-span-2 w-full bg-indigo-950	" type="submit" disabled={isLoading} size="icon">
                Generate
              </Button>

            </form>
          </Form>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
          {photos.map((src) => (

            <Card key={src} className="rounded-lg overflow-hidden">
              <div className="relative aspect-square">
                <Image fill alt="Generated" src={src} />
              </div>

              <CardFooter className="p-2">
                <Button onClick={() => window.open(src)} variant="secondary" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </CardFooter>
            </Card>



          ))}
        </div>
      </div>
    </div>

  );
}

export default ImageGenerationPage


