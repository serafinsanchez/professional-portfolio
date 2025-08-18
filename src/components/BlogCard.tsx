import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BlogPostListItem } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPostListItem
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <time dateTime={post.date}>{formattedDate}</time>
            {post.readTime && <span>{post.readTime}</span>}
          </div>
          <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </CardTitle>
          {post.excerpt && (
            <CardDescription className="line-clamp-3">
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>
        
        {post.tags && post.tags.length > 0 && (
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        )}
      </Link>
    </Card>
  )
}
