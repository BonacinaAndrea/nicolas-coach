module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("api");
  eleventyConfig.addPassthroughCopy("sitemap.xml");

  eleventyConfig.addWatchTarget("_servizi/");
  eleventyConfig.addWatchTarget("_testimonianze/");
  eleventyConfig.addWatchTarget("_casi_studio/");

  eleventyConfig.addCollection("servizi", function(collectionApi) {
    const items = collectionApi.getFilteredByGlob("./_servizi/*.md")
      .sort((a, b) => (a.data.ordine || "").localeCompare(b.data.ordine || ""));
    const grouped = {};
    items.forEach(item => {
      const cat = item.data.categoria;
      if (!grouped[cat]) grouped[cat] = { categoria: cat, servizi: [] };
      grouped[cat].servizi.push(item.data);
    });
    return Object.values(grouped);
  });

  eleventyConfig.addCollection("testimonianze", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./_testimonianze/*.md")
      .map(item => item.data);
  });

  eleventyConfig.addCollection("casi_studio", function(collectionApi) {
    return collectionApi.getFilteredByGlob("./_casi_studio/*.md")
      .map(item => item.data);
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk"
  };
};
