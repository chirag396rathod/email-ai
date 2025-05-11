import { Button } from "@/components/ui/button";
import React from "react";

const Success = () => {
  return (
    <div className="border rounded-2xl p-4 mt-4 bg-secondary">
      <div className="text-sm font-medium ">Email automation complete! 🎊</div>
      <div className="text-sm font-normal text-zinc-400">
        Want a fresh version? Regenerate the email or start with a new email
        list anytime.
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button>Send Emails</Button>
        <Button variant={"outline"}>Generate new</Button>
      </div>
    </div>
  );
};

export default Success;
