import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SkillCategory {
  name: string
  items: string[]
}

interface SkillsGridProps {
  categories: SkillCategory[]
}

export function SkillsGrid({ categories }: SkillsGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {categories.map((category, index) => (
        <Card key={index} className="transition-all duration-200 hover:shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold">
              {category.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill, skillIndex) => (
                <Badge 
                  key={skillIndex}
                  variant="secondary"
                  className="text-xs font-medium"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
