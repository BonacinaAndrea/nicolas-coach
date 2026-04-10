module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("admin");
  eleventyConfig.addPassthroughCopy("api");

  eleventyConfig.addCollection("servizi", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_servizi/*.md");
  });

  eleventyConfig.addCollection("testimonianze", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_testimonianze/*.md");
  });

  eleventyConfig.addCollection("casi_studio", function(collectionApi) {
    return collectionApi.getFilteredByGlob("_casi_studio/*.md");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_includes",
      data: "../_data"
    },
    templateFormats: ["njk", "html"],
    htmlTemplateEngine: "njk"
  };
};
