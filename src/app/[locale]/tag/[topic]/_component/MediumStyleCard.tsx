import Row from "@/components/Layout/Row";
import { Bookmark, Calendar, Star, Users } from "lucide-react";
import Link from "next/link";

export default function MediumStyleCard({ site }: { site: any }) {
  return (
    <Link href={`/site/${site.id}`} scroll={true}>
      <div
        className={"relative grid h-full w-full gap-4 text-left"}
        style={{
          gridTemplateRows: "auto 1fr",
          gridTemplateColumns: "repeat(1, 1fr)",
        }}
      >
        <img
          src={site.imageUrl}
          alt={site.name}
          className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div>
          <div className="flex flex-wrap gap-1.5 py-1">
            {site.tags.map((tag: string, index: number) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600 transition-colors hover:bg-gray-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="space-y-2">
            <h3 className="line-clamp-1 text-lg font-semibold text-gray-900">
              {site.name}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-500">
              {site.description}
            </p>
          </div>
          <Row className="mt-auto items-center justify-between pt-4 text-sm text-gray-500">
            <Row className="items-center gap-4">
              <Row className="items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>{site.rating}</span>
              </Row>
              <Row className="items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{site.visitors}</span>
              </Row>
              <Row className="items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{site.lastUpdate}</span>
              </Row>
            </Row>
            <button className="flex items-center gap-1 text-gray-500 transition-colors hover:text-gray-700">
              <Bookmark className="h-4 w-4" />
            </button>
          </Row>
        </div>
      </div>
    </Link>
  );
}
