import { DashboardCard } from "@/components/ui/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Database, Calendar, Clock, Satellite } from "lucide-react";
import { ConstellationPerformanceChart } from "../charts";

const sampleData = [
  { timestamp: "2024-01-01 00:00", satellite: "G01", type: "GEO", clockError: -2.34, ephemerisError: 0.12 },
  { timestamp: "2024-01-01 00:15", satellite: "G01", type: "GEO", clockError: -2.31, ephemerisError: 0.15 },
  { timestamp: "2024-01-01 00:30", satellite: "G01", type: "GEO", clockError: -2.28, ephemerisError: 0.11 },
  { timestamp: "2024-01-01 00:45", satellite: "G01", type: "GEO", clockError: -2.25, ephemerisError: 0.14 },
  { timestamp: "2024-01-01 01:00", satellite: "G01", type: "GEO", clockError: -2.22, ephemerisError: 0.13 },
];

export function DatasetSection() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dataset Overview</h1>
        <p className="text-lg text-muted-foreground">
          Seven-day GNSS error data sampled every 15 minutes across multiple satellite constellations
        </p>
      </div>

      {/* Dataset Description */}
      <div className="grid md:grid-cols-2 gap-6">
        <DashboardCard
          title="Data Collection"
          description="Multi-constellation GNSS error measurements"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Database className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-card-foreground">GNSS Error Dataset</h3>
                <p className="text-sm text-muted-foreground">
                  High-precision satellite error measurements
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-card-foreground">Duration</span>
                </div>
                <p className="text-lg font-bold text-primary">7 Days</p>
                <p className="text-xs text-muted-foreground">168 hours total</p>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-card-foreground">Sampling</span>
                </div>
                <p className="text-lg font-bold text-accent">15 min</p>
                <p className="text-xs text-muted-foreground">672 data points</p>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-card-foreground">Measurement Types</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Clock Errors</span>
                  <Badge className="bg-chart-1/20 text-chart-1 border-chart-1">Nanoseconds</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ephemeris Errors</span>
                  <Badge className="bg-chart-2/20 text-chart-2 border-chart-2">Meters</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Orbital Parameters</span>
                  <Badge className="bg-chart-3/20 text-chart-3 border-chart-3">Degrees</Badge>
                </div>
              </div>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title="Satellite Coverage"
          description="Multi-constellation coverage analysis"
          gradient
          glow
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Satellite className="h-8 w-8 text-accent" />
              <div>
                <h3 className="font-semibold text-card-foreground">Constellation Types</h3>
                <p className="text-sm text-muted-foreground">
                  GEO, GSO, and MEO satellites
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-card-foreground">Geostationary (GEO)</span>
                <Badge className="bg-chart-1/20 text-chart-1 border-chart-1">8 satellites</Badge>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-chart-1 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-card-foreground">Geosynchronous (GSO)</span>
                <Badge className="bg-chart-2/20 text-chart-2 border-chart-2">6 satellites</Badge>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-chart-2 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-card-foreground">Medium Earth Orbit (MEO)</span>
                <Badge className="bg-chart-3/20 text-chart-3 border-chart-3">12 satellites</Badge>
              </div>
              <div className="w-full bg-muted/30 rounded-full h-2">
                <div className="bg-chart-3 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-muted/20 rounded-lg">
              <p className="text-sm text-card-foreground font-medium mb-1">Total Coverage</p>
              <p className="text-xs text-muted-foreground">
                26 satellites across 4 major GNSS constellations (GPS, GLONASS, Galileo, BeiDou)
              </p>
            </div>
          </div>
        </DashboardCard>
      </div>

      {/* Data Preview Table */}
      <DashboardCard
        title="Data Preview"
        description="Sample of GNSS error measurements"
        gradient
      >
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Satellite</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Clock Error (ns)</TableHead>
                <TableHead>Ephemeris Error (m)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono text-sm">{row.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{row.satellite}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        row.type === 'GEO' ? 'bg-chart-1/20 text-chart-1 border-chart-1' :
                        row.type === 'GSO' ? 'bg-chart-2/20 text-chart-2 border-chart-2' :
                        'bg-chart-3/20 text-chart-3 border-chart-3'
                      }
                    >
                      {row.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{row.clockError}</TableCell>
                  <TableCell className="font-mono">{row.ephemerisError}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 text-sm text-muted-foreground text-center">
          Showing 5 of 672 total records • Data updated every 15 minutes
        </div>
      </DashboardCard>

      {/* Fixed: Added actual chart components with proper height and responsive design */}
      <DashboardCard
        title="Constellation Performance"
        description="Prediction accuracy across different satellite constellations"
        gradient
      >
        <ConstellationPerformanceChart height={400} />
      </DashboardCard>
    </div>
  );
}
