import { Typography } from "@/src/components/Typography";

interface TextLinkProps {
  prefix?: string;
  label: string;
  onPress: () => void;
}

export function TextLink({ prefix, label, onPress }: TextLinkProps) {
  return (
    <Typography variant="bodySmall">
      {prefix && (
        <Typography variant="bodySmall" color="textSecondary">
          {prefix}
        </Typography>
      )}
      <Typography variant="bodySmall" color="titlePrimary" onPress={onPress}>
        {label}
      </Typography>
    </Typography>
  );
}
