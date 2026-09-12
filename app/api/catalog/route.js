import {NextResponse} from 'next/server';
const KITSU=process.env.KITSU_API_URL||'https://kitsu.io/api/edge';
const MD=process.env.MANGADEX_API_URL||'https://api.mangadex.org', COVERS='https://uploads.mangadex.org';
const animeSets={trending:'trending/anime',popular:'anime?sort=-userCount',latest:'anime?sort=-startDate',upcoming:'anime?filter[status]=upcoming&sort=startDate',airing:'anime?filter[status]=current&sort=-startDate',top:'anime?sort=-averageRating'};

function kitsuUrl(path,limit,offset){return `${KITSU}/${path}${path.includes('?')?'&':'?'}page[limit]=${limit}&page[offset]=${offset}`;}
function normalizeManga(x){
 const a=x.attributes||{};
 const rels=x.relationships||[], cr=rels.find(r=>r.type==='cover_art');
 const file=cr?.attributes?.fileName;
 return {id:x.id,attributes:{canonicalTitle:a.title?.en||a.title?.['ja-ro']||Object.values(a.title||{})[0]||'Untitled',titles:{en:a.title?.en},description:a.description?.en||Object.values(a.description||{})[0]||'',synopsis:a.description?.en||'',status:a.status,startDate:a.year?String(a.year):'',chapterCount:a.lastChapter,volumeCount:a.lastVolume,averageRating:null,posterImage:file?{large:`${COVERS}/covers/${x.id}/${file}.256.jpg`}:null,coverImage:file?{large:`${COVERS}/covers/${x.id}/${file}.256.jpg`}:null}};
}
export async function GET(req){
 const {searchParams}=new URL(req.url), type=searchParams.get('type')||'anime', section=searchParams.get('section')||'trending';
 const limit=Math.min(Math.max(Number(searchParams.get('limit')||12),1),20), offset=Math.max(Number(searchParams.get('offset')||0),0);
 try{
  if(type==='manga'){
   const order=section==='latest'?'latestUploadedChapter':'followedCount';
   const u=new URL(`${MD}/manga`); u.searchParams.set('limit',String(limit)); u.searchParams.set('offset',String(offset)); u.searchParams.set('includes[]','cover_art'); u.searchParams.set(`order[${order}]`,'desc'); u.searchParams.set('contentRating[]','safe'); u.searchParams.set('contentRating[]','suggestive');
   const r=await fetch(u,{next:{revalidate:300},headers:{Accept:'application/json'}}); if(!r.ok) throw new Error(`MangaDex ${r.status}`);
   const j=await r.json(); return NextResponse.json({data:(j.data||[]).map(normalizeManga),meta:j.limit?j:null},{headers:{'Cache-Control':'s-maxage=300, stale-while-revalidate=900'}});
  }
  const raw=animeSets[section]||animeSets.trending, r=await fetch(kitsuUrl(raw,limit,offset),{next:{revalidate:120},headers:{Accept:'application/vnd.api+json'}});
  if(!r.ok) throw new Error(`Kitsu ${r.status}`); return NextResponse.json(await r.json(),{headers:{'Cache-Control':'s-maxage=120, stale-while-revalidate=600'}});
 }catch(e){return NextResponse.json({data:[],error:e.message||'Catalog request failed'},{status:502});}
}