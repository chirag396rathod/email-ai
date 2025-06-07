import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import React from "react";

const Success = () => {
  return (
    <div className="border rounded-2xl p-4 mt-4 bg-secondary">
      <div className="text-sm font-medium flex gap-2">Email automation complete! <PartyPopper color="#00bc7d" size={18} /></div>
      <div className="text-sm font-normal text-zinc-400">
        Want a fresh version? Regenerate the email or start with a new email
        list anytime.
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button>Send Emails</Button>
      </div>
    </div>
  );
};

export default Success;
