// Inside your Admin component, add a "View on Blogger" button
<div className="mt-4 flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-200">
  <span className="text-sm text-orange-800 font-medium">Blogger Sync Active</span>
  <a 
    href={`https://www.blogger.com/blog/posts/${process.env.NEXT_PUBLIC_BLOG_ID}`} 
    target="_blank"
    className="text-xs bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700"
  >
    View Archive
  </a>
</div>
