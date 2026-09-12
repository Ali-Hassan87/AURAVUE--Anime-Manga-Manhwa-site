export const sections=[
  {key:'trending',label:'Trending'}, {key:'popular',label:'Popular'}, {key:'latest',label:'Latest'},
  {key:'airing',label:'Airing Now'}, {key:'upcoming',label:'Upcoming'}, {key:'top',label:'Top Rated'}
];

export async function getCatalog(section='trending',type='anime',offset=0){
  const r=await fetch(`/api/catalog?type=${type}&section=${section}&offset=${offset}&limit=12`);
  const j=await r.json().catch(()=>({data:[]}));
  if(!r.ok) throw new Error(j.error||'Catalog unavailable');
  return j;
}
export async function searchCatalog(query,type='anime'){
  const r=await fetch(`/api/search?q=${encodeURIComponent(query)}&type=${type}`);
  const j=await r.json().catch(()=>({data:[]}));
  if(!r.ok) throw new Error(j.error||'Search unavailable');
  return j;
}
export async function getEnrichment(title,type='anime'){
  const r=await fetch(`/api/enrich?title=${encodeURIComponent(title)}&type=${type}`);
  if(!r.ok) return {};
  return r.json().catch(()=>({}));
}
export function imageOf(item){return item?.attributes?.posterImage?.large||item?.attributes?.posterImage?.original||item?.attributes?.coverImage?.large||item?.attributes?.coverImage?.original||item?.attributes?.coverImage?.small||'/poster-placeholder.svg';}
export function titleOf(item){const a=item?.attributes||{};return a.titles?.en||a.titles?.en_jp||a.titles?.ja_jp||a.canonicalTitle||a.title||'Untitled';}
export function descriptionOf(item){return String(item?.attributes?.synopsis||item?.attributes?.description||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();}
