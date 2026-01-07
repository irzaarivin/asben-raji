module.exports = async (repositories, helpers, data) => {
  try {
    const { response, minio } = helpers
    const { findAll } = repositories.contentRepositories
    const { getOne: findSubmodule } = repositories.submoduleRepositories
    const { getOne: findModule } = repositories.moduleRepositories 

    const rawContents = await findAll()

    const contents = await Promise.all(
      rawContents.map(async data => {
        const content = data.toObject?.() ?? data
        const pdfUrl = await minio.getTemporaryUrl(content.pdf, 1140)
        const subModule = await findSubmodule({ id: content.subModule })
        const module = subModule ? await findModule({ id: subModule.module_id }) : null

        return {
          ...content,
          pdf: pdfUrl,
          subModule,
          module,
        }
      })
    )

    return response.success(contents)
  } catch (error) {
    console.error('Error findAll content:', error)
    throw Error(error)
  }
}
