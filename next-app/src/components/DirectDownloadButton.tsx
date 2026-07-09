import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DirectDownloadButtonProps {
  documentSlug: string;
  buttonLabel?: string;
  buttonClassName?: string;
}

export function DirectDownloadButton({
  documentSlug,
  buttonLabel = "Download Datasheet",
  buttonClassName,
}: DirectDownloadButtonProps) {
  return (
    <Button asChild size="lg" variant="outline" className={buttonClassName}>
      <a href={`/api/documents/instant-download?slug=${documentSlug}`}>
        <Download className="h-5 w-5 mr-2" /> {buttonLabel}
      </a>
    </Button>
  );
}
