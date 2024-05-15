"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { businessNameSchema } from "@/schemas/client/business-name-schema";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import updateBusinessNameAction from "@/actions/update-business-name-action";

export function BusinessNameForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof businessNameSchema>>({
    resolver: zodResolver(businessNameSchema),
  });

  async function onSubmit(data: z.infer<typeof businessNameSchema>) {
    setIsLoading(true);
    const res = await updateBusinessNameAction(data);
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
          name="businessName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>business Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g sneakers" {...field} />
              </FormControl>
              <FormDescription>
                This will be your public display name
              </FormDescription>

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
