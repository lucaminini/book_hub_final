import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const LoadingButton = ({loading, children, ...props}) => {
  return <Button {...props} disabled={props.disabled || loading}>
    <span className="flex items-center justify-center gap-1">
      {loading}
      {loading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </span>
  </Button>
};

export default LoadingButton;