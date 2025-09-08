import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface Room {
  number: string;
  type: string;
  rate: number;
  capacity: number;
  status: "Available" | "Reserved" | "Occupied" | "Under Maintenance";
}

const initialRooms: Room[] = [
  {
    number: "A-101",
    type: "Single",
    rate: 4500,
    capacity: 2,
    status: "Available",
  },
  {
    number: "A-102",
    type: "Double",
    rate: 7000,
    capacity: 2,
    status: "Occupied",
  },
  {
    number: "B-201",
    type: "Single",
    rate: 4800,
    capacity: 2,
    status: "Reserved",
  },
  {
    number: "B-202",
    type: "Single",
    rate: 4800,
    capacity: 2,
    status: "Available",
  },
  {
    number: "C-301",
    type: "Double",
    rate: 7200,
    capacity: 2,
    status: "Occupied",
  },
  {
    number: "C-302",
    type: "Double",
    rate: 7200,
    capacity: 2,
    status: "Under Maintenance",
  },
  {
    number: "D-401",
    type: "Single",
    rate: 5000,
    capacity: 2,
    status: "Available",
  },
  {
    number: "D-402",
    type: "Single",
    rate: 5000,
    capacity: 2,
    status: "Available",
  },
];

export default function Rooms() {
  return (
    <div className="container py-10">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Rooms
          </h1>
          <p className="text-sm text-muted-foreground">
            CRUD-ready skeleton for 8 rooms. Hook to API later.
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add Room
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left p-3 font-medium">Room #</th>
              <th className="text-left p-3 font-medium">Type</th>
              <th className="text-left p-3 font-medium">Rate</th>
              <th className="text-left p-3 font-medium">Capacity</th>
              <th className="text-left p-3 font-medium">Status</th>
              <th className="text-right p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {initialRooms.map((r) => (
              <tr key={r.number} className="border-t">
                <td className="p-3 font-medium">{r.number}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">₱{r.rate.toLocaleString()}</td>
                <td className="p-3">{r.capacity}</td>
                <td className="p-3">
                  <span className={statusClass(r.status)}>{r.status}</span>
                </td>
                <td className="p-3 text-right">
                  <Button variant="outline" size="sm" className="mr-2">
                    <Pencil className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function statusClass(status: Room["status"]) {
  const base = "px-2 py-0.5 rounded-md border text-xs";
  switch (status) {
    case "Available":
      return (
        base +
        " bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
      );
    case "Reserved":
      return (
        base +
        " bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20"
      );
    case "Occupied":
      return (
        base + " bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20"
      );
    case "Under Maintenance":
      return (
        base +
        " bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20"
      );
  }
}
