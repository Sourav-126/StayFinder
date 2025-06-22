"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Counter } from "./counter-input";
import ImageUpload from "./image-file-token";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { CountrySelectValue } from "../types";
import { CountrySelect } from "../_components/country-select";

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

type FormSchema = {
  title: string;
  category: string;
  location: CountrySelectValue | null;
  description: string;
  roomCount: number;
  childCount: number;
  guestCount: number;
  imageSrc: string;
  price: number | null;
};

export default function BecomeAHostComponent() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, setValue, watch } = useForm<FormSchema>({
    defaultValues: {
      title: "",
      category: "",
      location: null,
      description: "",
      roomCount: 1,
      childCount: 0,
      guestCount: 2,
      imageSrc: "",
      price: null,
    },
  });

  // Fixed setCustomValue function - properly typed and handles each field
  const setCustomValue = (field: keyof FormSchema, value: any) => {
    setValue(field, value);
  };

  const category = watch("category");
  const location = watch("location");
  const roomCount = watch("roomCount");
  const childCount = watch("childCount");
  const guestCount = watch("guestCount");
  const imageSrc = watch("imageSrc");
  const title = watch("title");
  const description = watch("description");
  const price = watch("price");

  const isStepValid = useMemo(() => {
    switch (step) {
      case STEPS.CATEGORY:
        return !!category;
      case STEPS.LOCATION:
        return !!location?.value;
      case STEPS.INFO:
        return guestCount >= 2 && roomCount > 0;
      case STEPS.IMAGES:
        return !!imageSrc;
      case STEPS.DESCRIPTION:
        return !!title && !!description;
      case STEPS.PRICE:
        return !!price && price > 0;
      default:
        return true;
    }
  }, [
    step,
    category,
    location,
    roomCount,
    guestCount,
    imageSrc,
    title,
    description,
    price,
  ]);

  const onLeftClick = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: FormSchema) => {
    try {
      setIsLoading(true);
      await axios.post(`/api/v1/listing`, data);
      toast.success("Listing Created Successfully");
      router.push("/properties");
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error("Failed to create listing");
    } finally {
      setIsLoading(false);
    }
  };

  const onRightClick = () => {
    if (step !== STEPS.PRICE) {
      setStep((prev) => prev + 1);
    }
  };

  const nextLabel = useMemo(() => {
    return step === STEPS.PRICE ? (
      <span className="flex flex-row gap-2 items-center text-white font-semibold text-md">
        {isLoading ? "Creating..." : "List"}
        <ArrowRight size="20" className="text-white" />
      </span>
    ) : (
      <ArrowRight size="20" className="text-white" />
    );
  }, [step, isLoading]);

  let sourceAtStep;
  if (step === STEPS.CATEGORY) {
    sourceAtStep = (
      <div className="flex flex-col gap-3 pb-24">
        {" "}
        {/* Added padding bottom for fixed buttons */}
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          Which of this category defines your Property?
        </h1>
        <p className="text-gray-500">Pick a Category</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map((each) => (
            <div
              key={each.label}
              onClick={() => {
                console.log("Category clicked:", each.label); // Debug log
                setCustomValue("category", each.label);
              }}
              className={cn(
                "bg-gray-100 flex flex-col p-5 rounded-lg border-2 cursor-pointer hover:border-red-400 transition-colors",
                category === each.label
                  ? "bg-red-400/80 text-white border-red-400"
                  : "bg-gray-100 border-gray-300"
              )}
            >
              <each.icon className="mb-2" />
              <span className="text-sm font-medium">{each.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (step === STEPS.LOCATION) {
    sourceAtStep = (
      <div className="pb-24">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          Where is your property based out of?
        </h1>
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />
      </div>
    );
  } else if (step === STEPS.INFO) {
    sourceAtStep = (
      <div className="flex flex-col gap-3 pb-24">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          Choose your preferences
        </h1>
        <div className="flex justify-between items-center">
          <span>
            <h3 className="text-lg font-semibold text-gray-600">
              How many rooms do you want?
            </h3>
            <p className="text-gray-500">Choose a room count</p>
          </span>
          <Counter
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
        </div>
        <div className="w-full h-[0.4px] bg-gray-300 my-6" />
        <div className="flex justify-between items-center">
          <span>
            <h3 className="text-lg font-semibold text-gray-600">
              How many Children do you have?
            </h3>
            <p className="text-gray-500">Choose a children count</p>
          </span>
          <Counter
            value={childCount}
            onChange={(value) => setCustomValue("childCount", value)}
          />
        </div>
        <div className="w-full h-[0.4px] bg-gray-300 my-6" />
        <div className="flex justify-between items-center">
          <span>
            <h3 className="text-lg font-semibold text-gray-600">
              How many Adults are planning to join?
            </h3>
            <p className="text-gray-500">Choose a guest count</p>
          </span>
          <Counter
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
        </div>
      </div>
    );
  } else if (step === STEPS.IMAGES) {
    sourceAtStep = (
      <div className="flex flex-col gap-3 pb-24">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          Upload a great image of your property
        </h1>
        {imageSrc && (
          <div className="relative w-full max-w-md mx-auto">
            <Image
              src={imageSrc}
              width={500}
              height={350}
              alt="Property image"
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <ImageUpload
          value={imageSrc}
          returnUrl={(url: string) => setCustomValue("imageSrc", url)}
        />
      </div>
    );
  } else if (step === STEPS.DESCRIPTION) {
    sourceAtStep = (
      <div className="flex flex-col gap-3 pb-24">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          A bit of Details on your Property
        </h1>
        <Input
          placeholder="Title about your Property"
          {...register("title")}
          className="text-base"
        />
        <Textarea
          placeholder="What is the story behind your property"
          {...register("description")}
          className="min-h-[120px] text-base"
        />
      </div>
    );
  } else if (step === STEPS.PRICE) {
    sourceAtStep = (
      <div className="flex flex-col gap-3 pb-24">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          How much do you charge for your property per Night?
        </h1>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">
            ₹
          </span>
          <Input
            placeholder="e.g 1000"
            type="number"
            className="pl-8 text-base"
            {...register("price", { valueAsNumber: true })}
          />
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen p-6">
      {sourceAtStep}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center px-8 py-4">
          {step > 0 ? (
            <button
              className="p-4 bg-red-400 rounded-full cursor-pointer hover:bg-red-500 transition-colors"
              onClick={onLeftClick}
              type="button"
            >
              <ArrowLeft size="20" className="text-white" />
            </button>
          ) : (
            <div></div>
          )}

          <button
            onClick={
              step === STEPS.PRICE ? handleSubmit(onSubmit) : onRightClick
            }
            className="p-4 bg-red-400 rounded-full cursor-pointer hover:bg-red-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!isStepValid || isLoading}
            type="button"
          >
            {nextLabel}
          </button>
        </div>
        <div
          className="progress-bar bg-red-400 h-[4px] transition-all duration-300"
          style={{
            width: `${((step + 1) / Object.keys(STEPS).length) * 100}%`,
          }}
        ></div>
      </div>
    </section>
  );
}
