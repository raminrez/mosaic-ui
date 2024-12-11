import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import type { FieldProps } from "./field.types";
import type { z } from "zod";

export type FieldProps = {
  name: string;
  label?: string;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<any>) => void;
  validation?: z.ZodType<any, any>;
  className?: string;
  defaultValue?: any;
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
};

const Field: React.FC<FieldProps> = ({
  name,
  label,
  helperText,
  children,
  validation,
  onChange,
  className,
  defaultValue,
}) => {
  const formCTX = useFormContext();

  if (!formCTX) {
    throw new Error(
      "The Field component only works only works in FormProvider component!"
    );
  }

  useEffect(() => {
    if (defaultValue !== undefined) {
      formCTX.setValue(name, defaultValue, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  }, [defaultValue, name, formCTX.setValue, formCTX.getValues]);

  // @ts-expect-error TODO: Fix the type later
  const validate = (value) => {
    if (validation) {
      const result = validation.safeParse(value);
      if (!result.success) {
        return result.error.errors[0].message;
      }
    }
    return true;
  };

  return (
    <div className={className}>
      <FormField
        control={formCTX.control}
        name={name}
        rules={{ validate }}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {React.cloneElement(children, {
                ...children.props,
                ...field,
                onChange: (e: React.ChangeEvent<any>) => {
                  field.onChange(e);
                  if (onChange) {
                    onChange(e);
                  }
                  if (children.props.onChange) {
                    children.props.onChange(e);
                  }
                },
              })}
            </FormControl>
            {helperText && <FormDescription>{helperText}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

Field.displayName = "Field";

export { Field };
