﻿// <auto-generated />
using ERP.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ERP.EntityFramework.Migrations
{
    [DbContext(typeof(ERPContext))]
    [Migration("20180704115209_InitialMigration")]
    partial class InitialMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.0-rtm-30799")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ERP.Domain.Models.City", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<int>("ProvinceId");

                    b.HasKey("Id");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Cities");
                });

            modelBuilder.Entity("ERP.Domain.Models.Fabric", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Abbreviation");

                    b.Property<int>("FabricTypeId");

                    b.Property<int>("Length");

                    b.Property<string>("Name");

                    b.Property<string>("PurchaseArea");

                    b.Property<string>("SaleUnit");

                    b.Property<string>("Type");

                    b.Property<int>("Width");

                    b.Property<bool>("isHidden");

                    b.Property<bool>("isRemoved");

                    b.HasKey("Id");

                    b.HasIndex("FabricTypeId");

                    b.ToTable("Fabrics");
                });

            modelBuilder.Entity("ERP.Domain.Models.FabricType", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name");

                    b.Property<bool>("isHidden");

                    b.Property<bool>("isRemoved");

                    b.HasKey("Id");

                    b.ToTable("FabricTypes");
                });

            modelBuilder.Entity("ERP.Domain.Models.Mill", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CityId");

                    b.Property<string>("ManagerCell");

                    b.Property<string>("ManagerName");

                    b.Property<string>("Name");

                    b.Property<string>("Product");

                    b.Property<int>("ProvinceId");

                    b.HasKey("Id");

                    b.HasIndex("CityId");

                    b.HasIndex("ProvinceId");

                    b.ToTable("Mill");
                });

            modelBuilder.Entity("ERP.Domain.Models.MillFabric", b =>
                {
                    b.Property<int>("MillId");

                    b.Property<int>("FabricId");

                    b.HasKey("MillId", "FabricId");

                    b.HasIndex("FabricId");

                    b.ToTable("MillFabrics");
                });

            modelBuilder.Entity("ERP.Domain.Models.Province", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsHidden");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Provinces");
                });

            modelBuilder.Entity("ERP.Domain.Models.City", b =>
                {
                    b.HasOne("ERP.Domain.Models.Province", "Province")
                        .WithMany("Cities")
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ERP.Domain.Models.Fabric", b =>
                {
                    b.HasOne("ERP.Domain.Models.FabricType", "FabricType")
                        .WithMany()
                        .HasForeignKey("FabricTypeId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ERP.Domain.Models.Mill", b =>
                {
                    b.HasOne("ERP.Domain.Models.City", "City")
                        .WithMany("Mill")
                        .HasForeignKey("CityId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ERP.Domain.Models.Province", "Province")
                        .WithMany()
                        .HasForeignKey("ProvinceId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ERP.Domain.Models.MillFabric", b =>
                {
                    b.HasOne("ERP.Domain.Models.Fabric", "Fabric")
                        .WithMany("MillFabrics")
                        .HasForeignKey("FabricId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("ERP.Domain.Models.Mill", "Mill")
                        .WithMany("MillFabrics")
                        .HasForeignKey("MillId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
