"use client";
import { RadioGroupItem, RadioGroup } from "../ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PhotosUploader from "../uploader";
import { z } from "zod";
import { addProductSchema } from "@/schemas/client/add-product-schema";
import { useState } from "react";
import addProductAction from "@/actions/add-product-action";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export function AddProductForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [images, setImages] = useState<any>([]);

  const form = useForm<z.infer<typeof addProductSchema>>({
    resolver: zodResolver(addProductSchema),
  });

  async function onSubmit(data: z.infer<typeof addProductSchema>) {
    setIsLoading(true);
    const res = await addProductAction(data, images[0]);
    if (!res) {
      toast({
        title: "something went wrong",
      });
      setIsLoading(false);
      return;
    }
    toast({
      title: "product added",
    });
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>productName</FormLabel>
              <FormControl>
                <Input placeholder="e.g sneakers" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="This is a good product" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="productPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>price</FormLabel>
              <FormControl>
                <Input placeholder="price in dollars" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PhotosUploader
          maxPhotos={1}
          addedPhotos={images}
          onChange={setImages}
        />
        <FormField
          control={form.control}
          name="isVR"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>opt for AR experience</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">no</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isLoading}
          className={`${isLoading ? "opacity-30" : ""} flex-row-reverse`}
        >
          {isLoading ? (
            <Loader2 className="ml-2 h-4 w-4 animate-spin"></Loader2>
          ) : (
            ""
          )}
          create
        </Button>
      </form>
    </Form>
  );
}
