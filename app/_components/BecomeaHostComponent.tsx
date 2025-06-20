"use client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { categories } from "@/static/config";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import CountrySelect from "./country-select";
import { Input } from "@/components/ui/input";
import { Counter } from "./counter-input";
import ImageUpload from "./image-file-token";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
const STEPS = {
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
};

export default function BecomeAHostComponent() {
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const setCustomValue = (title: string, value: any) => {
    setValue(title as any, value);
  };

  interface CountryOption {
    value: string;
    label: string;
  }

  const { register, handleSubmit, setValue, watch } = useForm<{
    title: string;
    category: string;
    location: CountryOption | null;
    description: string;
    roomCount: number;
    childCount: number;
    guestCount: number;
    imageSrc: string;
    price: number | null;
  }>({
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
        return (
          !!location &&
          (typeof location === "object" ? location.value : location)
        );
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
    childCount,
    guestCount,
    imageSrc,
    title,
    description,
    price,
  ]);

  const onLeftClick = () => {
    setStep((step) => step - 1);
  };

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`/api/v1/listing`, data).then(() => {
        toast.success("Listing Created Successfully");
      });
      router.push("/properties");
    } catch (error) {
      console.error("Error creating listing:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRightClick = () => {
    if (step !== STEPS.PRICE) {
      setStep((step) => step + 1);
    }
    // For the final step, we'll use handleSubmit in the button onClick
  };

  const nextLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return (
        <span className="flex flex-row gap-2 items-center text-white font-semibold text-md">
          {isLoading ? "Creating..." : "List"}
          <ArrowRight size="20" className="text-white" />
        </span>
      );
    } else {
      return <ArrowRight size="20" className="text-white" />;
    }
  }, [step, isLoading]);

  let sourceAtStep = (
    <div className="flex flex-col gap-3">
      <h1 className="text-lg md:text-xl font-semibold text-gray-600">
        Which of this category defines your Property?
      </h1>
      <p className="text-gray-500">Pick a Category</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {categories.map((each) => {
          return (
            <div
              key={each.label}
              onClick={() => {
                setCustomValue("category", each.label);
              }}
              className={cn(
                "bg-gray-100 flex flex-col p-5 rounded-lg border-gray-300/10 cursor-pointer",
                category === each.label
                  ? "bg-red-400/80 text-white"
                  : "bg-gray-100"
              )}
            >
              <each.icon />
              {each.label}
            </div>
          );
        })}
      </div>
    </div>
  );

  if (step == STEPS.LOCATION) {
    sourceAtStep = (
      <div>
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          Where is your property based out of?
        </h1>
        <CountrySelect
          value={location}
          onChange={(value: any) => setCustomValue("location", value)}
        />
      </div>
    );
  } else if (step == STEPS.INFO) {
    sourceAtStep = (
      <div className="flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          Choose your preferences
        </h1>
        <div className="flex justify-between">
          <span>
            <h3 className="text-lg font-semibold text-gray-600">
              How many rooms do you want?
            </h3>
            <p>Choose a room count</p>
          </span>
          <Counter
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
        </div>
        <div className="w-full h-[0.4px] bg-gray-800 my-10" />
        <div className="flex justify-between">
          <span>
            <h3 className="text-lg font-semibold text-gray-600">
              How many Children do you have?
            </h3>
            <p>Choose a children Count</p>
          </span>
          <Counter
            value={childCount}
            onChange={(value) => setCustomValue("childCount", value)}
          />
        </div>
        <div className="w-full h-[0.4px] bg-gray-800 my-10" />
        <div className="flex justify-between">
          <span>
            <h3 className="text-lg font-semibold text-gray-600">
              How many Adults are planning to join?
            </h3>
            <p>Choose a guest count</p>
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
      <div className="flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          Upload a great image of your property
        </h1>
        {imageSrc && (
          <Image src={imageSrc} width={500} height={350} alt="Property image" />
        )}
        <ImageUpload
          value={imageSrc}
          returnUrl={(url) => setCustomValue("imageSrc", url)}
        />
      </div>
    );
  } else if (step === STEPS.DESCRIPTION) {
    sourceAtStep = (
      <div className="flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          A bit of Details on your Property
        </h1>
        <Input placeholder="title about your Property" {...register("title")} />
        <Textarea
          placeholder="What is the story behind your property"
          {...register("description")}
        />
      </div>
    );
  } else if (step === STEPS.PRICE) {
    sourceAtStep = (
      <div className="flex flex-col gap-3">
        <h1 className="text-lg md:text-xl font-semibold text-gray-600">
          How much do you charge for your property per Night?
        </h1>
        <Input placeholder="e.g 1000" {...register("price")} />
      </div>
    );
  }

  return (
    <section>
      {sourceAtStep}
      <div className="w-full flex flex-col fixed bottom-0">
        <div className="flex justify-between px-8 pb-4">
          {step > 0 && (
            <button className="p-4 bg-red-400 rounded-full cursor-pointer hover:bg-red-500 transition-colors">
              <ArrowLeft
                onClick={onLeftClick}
                size="20"
                className="text-white"
              />
            </button>
          )}

          {step === 0 && <div></div>}

          <button
            onClick={
              step === STEPS.PRICE ? handleSubmit(onSubmit) : onRightClick
            }
            className="p-4 bg-red-400 rounded-full cursor-pointer hover:bg-red-500 transition-colors disabled:bg-gray-400"
            disabled={!isStepValid || isLoading}
          >
            {nextLabel}
          </button>
        </div>
        <div
          className="progress-bar bg-red-400 h-[4px]"
          style={{
            width: `${((step + 1) / Object.keys(STEPS).length) * 100}%`,
          }}
        ></div>
      </div>
    </section>
  );
}
