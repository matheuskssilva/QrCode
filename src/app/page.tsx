"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import QRCode from "react-qr-code";
import { Header } from "./container/header";
import Generate from "./container/generate";




export default function Home() {
  

  return (
    <div className="flex items-center  flex-col gap-28 bg-[#171717] h-screen w-full">
      <Header />
      <Generate />
    </div>
  );
}
