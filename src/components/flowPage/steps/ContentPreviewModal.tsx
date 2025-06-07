"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function ContentPreviewModal({
  className,
  data,
  setGeneratedData,
  handleSubmitFormData,
  disabled,
}: {
  className: string;
  data?: any;
  setGeneratedData: any;
  handleSubmitFormData: any;
  disabled?: any;
}) {
  const handleChangeEMailContent = (e: any, name: any) => {
    const value = e.target && e.target.value;
    const sanitizedData = [...data].find((item: any) => item.name === name);
    sanitizedData.emailContent = value;
    const updatedData = [...data].map((item: any) => {
      if (item.name === name) {
        return { ...item, emailContent: value };
      }
      return item;
    });
    setGeneratedData(updatedData);
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className={className} variant="outline">
            {disabled ? "Preview Approved Content" : "Preview Content"}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1080px]">
          <DialogHeader>
            <DialogTitle>Preview Content</DialogTitle>
            <DialogDescription>
              Review the generated email content before sending or making
              changes.
            </DialogDescription>
          </DialogHeader>
          {data.length > 0 && (
            <Tabs defaultValue={data[0].name}>
              <TabsList className="mb-4">
                {data.map((item: any) => (
                  <TabsTrigger key={item.name} value={item.name}>
                    {item.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {data.map((item: any) => (
                <TabsContent key={item.name} value={item.name}>
                  <Label>{item.topic}</Label>
                  <Textarea
                    value={item.emailContent}
                    className="max-h-[320px] w-[100%] mt-4"
                    onChange={(e: any) =>
                      handleChangeEMailContent(e, item.name)
                    }
                    disabled={disabled}
                  />
                </TabsContent>
              ))}
            </Tabs>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                onClick={() => handleSubmitFormData(data)}
                disabled={disabled}
              >
                Approved & Send Emails
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
