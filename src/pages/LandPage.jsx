import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import companies from "../data/companies.json";
import faq from "../data/FAQ.json";
import Autoplay from "embla-carousel-autoplay";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const LandPage = () => {
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 ">
      <section className="text-center">
        <h1
          className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl
       tracking-tighter py-4 "
        >
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6">
            and get{" "}
            <img
              src="/logo.webp"
              alt="job-por logo"
              className="h-14 sm:h-24 lg:h-32"
            />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of trending jobs and exploring your career
        </p>
      </section>
      <div className="flex gap-6 justify-center">
        {/* buttons */}
        <Link to="/jobs">
          <Button variant="aqua" size="xl">
            Find Jobs
          </Button>
        </Link>
        <Link to="/post">
          <Button variant="red" size="xl">
            Post Jobs
          </Button>
        </Link>
      </div>

      {/* carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent>
          {companies.map(({ name, id, path }) => {
            return (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6">
                <img
                  src={path}
                  alt={name}
                  className="h-15 sm:h-20 object-contain"
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      {/* banner */}
      <img src="/banner.avif" alt="" className="w-full" />
      {/* cards */}

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For Jog Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Search and apply for jobs,track applications,contact Hr, and more.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post Jobs,Manage applications and find the best candidates.</p>
          </CardContent>
        </Card>
      </section>
      {/* Accordion */}
      <Accordion type="single" collapsible>
        {faq.map((fa,index) => {
          return(
          <AccordionItem key={index} value={`item-${index+1}`}>
            <AccordionTrigger>{fa.question}</AccordionTrigger>
            <AccordionContent>
              {fa.answer}
            </AccordionContent>
          </AccordionItem>
          );
        })}
      </Accordion>
    </main>
  );
};

export default LandPage;