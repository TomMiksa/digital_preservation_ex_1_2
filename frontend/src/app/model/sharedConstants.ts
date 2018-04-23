export class SharedConstants {

  public static documentation = 'Each resource contains a short description on Zenodo where the DOI\'s got created. There is no special format for the description.';

  public static metaData = 'For resources other then software the metadata available from Zenodo will be provided. If the resources contain software and the software is hosted on a public Github repository, then metadata from Github will be used.';

  public static ethicsAndLegal = 'The resources may contain license information, which can be used to manage copyright and Intellectual Property Rights (IPR) issues.';

  public static storageBackup = 'The resources are stored online via Zenodo and Github. Zenodo is backed up by CERN and promises save keeping of the data.';

  public static dataSharing = 'Every resource has a DOI and can be accessed via Zenodo as well as referenced or cited. This also means that all of the resources used are publicly available with open access. License information can be taken from the respective resource. ';

  public static responsibleManagement = 'The author of the DMP is responsible for the implementation of the DMP and is also responsible for ensuring that the DMP is reviewed and revised.';

  public static responsibleResourceImplementation = 'For long-term archiving of the data, the research data repository Zenodo will be used.';

  constructor() {
  }
}
