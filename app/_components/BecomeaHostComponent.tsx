"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { categories } from "@/static/config";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Counter } from "./counter-input";
import ImageUpload from "./image-file-token";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CountrySelect } from "./country-select";
import { CountrySelectValue } from "../types";
interface ListingFormData {
  title: string;
  category: string;
  location: CountrySelectValue | null;
  description: string;
  roomCount: number;
  childCount: number;
  guestCount: number;
  imageSrc: string;
  price: number | null;
  isApproved?: boolean;
}

const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

export const BecomeAHostComponent = () => {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
  } = useForm<ListingFormData>({
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
      isApproved: false,
    },
  });

  const setCustomValue = (
    field: keyof ListingFormData,
    value: ListingFormData[keyof ListingFormData]
  ) => {
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

  const onSubmit = async (data: ListingFormData) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/v1/listing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success(
          "Property submitted for approval. You will receive confirmation soon.",
          { duration: 4000 }
        );
        router.push("/");
      } else {
        toast.error(responseData.error || "Something went wrong");
      }
    } catch {
      toast.error("Failed to submit property");
    } finally {
      setIsSubmitting(false);
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
        {isSubmitting ? "Submitting..." : "List"}
        <ArrowRight size="20" className="text-white" />
      </span>
    ) : (
      <ArrowRight size="20" className="text-white" />
    );
  }, [step, isSubmitting]);

  let sourceAtStep;
  if (step === STEPS.CATEGORY) {
    sourceAtStep = (
      <div className="flex flex-col gap-3 pb-24">
        {" "}
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          Which of this category defines your Property?
        </h1>
        <p className="text-gray-500">Pick a Category</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {categories.map((each) => (
            <motion.div
              key={each.label}
              onClick={() => {
                setCustomValue("category", each.label);
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "flex flex-col p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden group select-none shadow-sm",
                category === each.label
                  ? "bg-red-50/60 border-red-400 text-red-500 shadow-md shadow-red-100"
                  : "bg-gray-50 border-gray-200/80 text-gray-500 hover:border-red-200 hover:bg-white"
              )}
            >
              <div className="flex justify-between items-center w-full mb-3">
                <each.icon className={cn("w-6 h-6 stroke-[1.75]", category === each.label ? "text-red-500" : "text-gray-400")} />
                {category === each.label && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="w-5 h-5 bg-red-400 rounded-full flex items-center justify-center shadow-sm"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </div>
              <span className="text-sm font-bold tracking-tight">{each.label}</span>
            </motion.div>
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
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3">
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
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3">
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
        <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3">
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
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -15 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {sourceAtStep}
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-between items-center px-4 xs:px-8 py-4">
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
            disabled={!isStepValid || isSubmitting}
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
};
