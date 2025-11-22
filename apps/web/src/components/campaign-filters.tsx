import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export function CampaignFilters() {
  return (
    <Card className="sticky top-24">
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Eligibility</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="eligible" defaultChecked />
              <Label htmlFor="eligible" className="text-sm font-normal cursor-pointer">
                Eligible
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="partial" />
              <Label htmlFor="partial" className="text-sm font-normal cursor-pointer">
                Partially Eligible
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="all" />
              <Label htmlFor="all" className="text-sm font-normal cursor-pointer">
                Show All
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Reward Range</h4>
          <div className="px-1">
            <Slider defaultValue={[0, 100]} max={100} step={5} className="mb-2" />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>$0</span>
              <span>$100+</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Minimum CVS</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="cvs-any" defaultChecked />
              <Label htmlFor="cvs-any" className="text-sm font-normal cursor-pointer">
                Any Score
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cvs-70" />
              <Label htmlFor="cvs-70" className="text-sm font-normal cursor-pointer">
                70+
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cvs-80" />
              <Label htmlFor="cvs-80" className="text-sm font-normal cursor-pointer">
                80+
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cvs-90" />
              <Label htmlFor="cvs-90" className="text-sm font-normal cursor-pointer">
                90+
              </Label>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-foreground">Category</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox id="cat-defi" />
              <Label htmlFor="cat-defi" className="text-sm font-normal cursor-pointer">
                DeFi
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cat-nft" />
              <Label htmlFor="cat-nft" className="text-sm font-normal cursor-pointer">
                NFT
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cat-gaming" />
              <Label htmlFor="cat-gaming" className="text-sm font-normal cursor-pointer">
                Gaming
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="cat-wallet" />
              <Label htmlFor="cat-wallet" className="text-sm font-normal cursor-pointer">
                Wallets
              </Label>
            </div>
          </div>
        </div>

        <Button variant="outline" className="w-full bg-transparent" size="sm">
          Reset Filters
        </Button>
      </CardContent>
    </Card>
  )
}
