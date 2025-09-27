import { Car } from "../types/car";

export const mockCars: Car[] = [
  {
    id: "1",
    brand: "BMW",
    model: "5 Series",
    year: 2023,
    price: 52000,
    mileage: 9300,
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Black",
    engineVolume: 2.0,
    power: 245,
    images: [
      "https://images.unsplash.com/photo-1682845485707-f5029d736001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCTVclMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTgxOTI5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    features: ["Leather Interior", "Panoramic Roof", "Adaptive LED", "Navigation", "Climate Control"],
    description: "Premium BMW 5 Series sedan with turbocharged engine and superior comfort level.",
    showroomId: "showroom1",
    showroomName: "BMW Center Downtown",
    isNew: false
  },
  {
    id: "2",
    brand: "Mercedes-Benz",
    model: "GLC",
    year: 2024,
    price: 60000,
    mileage: 0,
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Crossover",
    color: "Silver",
    engineVolume: 2.0,
    power: 258,
    images: [
      "https://images.unsplash.com/photo-1652510055689-db9f0ef567fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMFNVViUyMGNhcnxlbnwxfHx8fDE3NTgyODcyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    features: ["MBUX", "4MATIC", "LED Headlights", "360° Cameras", "Wireless Charging"],
    description: "New Mercedes-Benz GLC with modern technologies and all-wheel drive.",
    showroomId: "showroom2",
    showroomName: "Mercedes-Benz Westside",
    isNew: true
  },
  {
    id: "3",
    brand: "Audi",
    model: "A4",
    year: 2023,
    price: 44000,
    mileage: 5300,
    fuelType: "Gasoline",
    transmission: "CVT",
    bodyType: "Sedan",
    color: "White",
    engineVolume: 2.0,
    power: 190,
    images: [
      "https://images.unsplash.com/photo-1666612509979-9133d7913b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBdWRpJTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1ODE5MjkxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    features: ["Virtual Cockpit", "Quattro", "Matrix LED", "Bang & Olufsen", "Adaptive Cruise Control"],
    description: "Elegant Audi A4 with all-wheel drive and advanced safety technologies.",
    showroomId: "showroom3",
    showroomName: "Audi Center North",
    isNew: false
  },
  {
    id: "4",
    brand: "Toyota",
    model: "Camry",
    year: 2023,
    price: 32000,
    mileage: 7500,
    fuelType: "Gasoline",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Gray",
    engineVolume: 2.5,
    power: 181,
    images: [
      "https://images.unsplash.com/photo-1648197323414-4255ea82d86b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxUb3lvdGElMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTgyMTI3ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    features: ["Toyota Safety Sense", "JBL Audio System", "Wireless Android Auto", "Heated Seats"],
    description: "Reliable Toyota Camry with excellent fuel economy and comfort.",
    showroomId: "showroom4",
    showroomName: "Toyota Center South",
    isNew: false
  },
  {
    id: "5",
    brand: "BMW",
    model: "X3",
    year: 2024,
    price: 67000,
    mileage: 0,
    fuelType: "Diesel",
    transmission: "Automatic",
    bodyType: "Crossover",
    color: "Blue",
    engineVolume: 2.0,
    power: 190,
    images: [
      "https://images.unsplash.com/photo-1682845485707-f5029d736001?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCTVclMjBzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NTgxOTI5MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    features: ["xDrive", "Harman Kardon", "Gesture Control", "Live Cockpit Professional"],
    description: "New BMW X3 with diesel engine and intelligent all-wheel drive.",
    showroomId: "showroom1",
    showroomName: "BMW Center Downtown",
    isNew: true
  },
  {
    id: "6",
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2022,
    price: 48000,
    mileage: 15500,
    fuelType: "Hybrid",
    transmission: "Automatic",
    bodyType: "Sedan",
    color: "Black",
    engineVolume: 2.0,
    power: 320,
    images: [
      "https://images.unsplash.com/photo-1652510055689-db9f0ef567fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZXJjZWRlcyUyMFNVViUyMGNhcnxlbnwxfHx8fDE3NTgyODcyMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    features: ["EQBoost", "Distronic Plus", "Multibeam LED", "Burmester", "Air Body Control"],
    description: "Hybrid Mercedes-Benz E-Class with advanced driver assistance systems.",
    showroomId: "showroom2",
    showroomName: "Mercedes-Benz Westside",
    isNew: false
  }
];